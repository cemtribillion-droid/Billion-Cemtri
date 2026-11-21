import { createExpressApp } from '../../server/app';

interface NetlifyEvent {
  rawUrl?: string;
  path: string;
  httpMethod: string;
  headers?: Record<string, string | undefined>;
  body?: string | null;
  isBase64Encoded?: boolean;
}

interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const app = createExpressApp();

// Lightweight Express adapter for Netlify Functions compatibility
export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  return new Promise((resolve) => {
    const reqUrl = event.rawUrl
      ? new URL(event.rawUrl).pathname + (new URL(event.rawUrl).search || '')
      : event.path.replace(/^\/\.netlify\/functions\/api/, '/api');

    const headers: Record<string, string> = {};
    for (const [k, v] of Object.entries(event.headers || {})) {
      if (typeof v === 'string') headers[k.toLowerCase()] = v;
    }

    const bodyBuffer = event.body
      ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
      : undefined;

    const mockReq: Record<string, unknown> = {
      method: event.httpMethod,
      url: reqUrl.startsWith('/api') ? reqUrl : `/api${reqUrl}`,
      originalUrl: reqUrl.startsWith('/api') ? reqUrl : `/api${reqUrl}`,
      headers,
      body: bodyBuffer && headers['content-type']?.includes('application/json')
        ? JSON.parse(bodyBuffer.toString('utf8'))
        : undefined,
    };

    const resHeaders: Record<string, string> = {};
    let statusCode = 200;
    const chunks: Buffer[] = [];

    const mockRes: Record<string, unknown> = {
      statusCode: 200,
      setHeader(name: string, value: string | string[]) {
        resHeaders[name.toLowerCase()] = Array.isArray(value) ? value.join(', ') : String(value);
      },
      getHeader(name: string) {
        return resHeaders[name.toLowerCase()];
      },
      status(code: number) {
        statusCode = code;
        return mockRes;
      },
      json(payload: unknown) {
        resHeaders['content-type'] = 'application/json';
        resolve({
          statusCode,
          headers: resHeaders,
          body: JSON.stringify(payload),
        });
      },
      send(payload: unknown) {
        const str = Buffer.isBuffer(payload) ? payload.toString('utf8') : String(payload ?? '');
        resolve({
          statusCode,
          headers: resHeaders,
          body: str,
        });
      },
      end(payload?: unknown) {
        if (payload) chunks.push(Buffer.isBuffer(payload) ? payload : Buffer.from(String(payload)));
        resolve({
          statusCode,
          headers: resHeaders,
          body: Buffer.concat(chunks).toString('utf8'),
        });
      },
      cookie(name: string, val: string) {
        resHeaders['set-cookie'] = `${name}=${encodeURIComponent(val)}; Path=/; HttpOnly; SameSite=Lax`;
        return mockRes;
      },
      clearCookie(name: string) {
        resHeaders['set-cookie'] = `${name}=; Path=/; HttpOnly; Max-Age=0`;
        return mockRes;
      },
    };

    (app as unknown as (req: unknown, res: unknown) => void)(mockReq, mockRes);
  });
};
