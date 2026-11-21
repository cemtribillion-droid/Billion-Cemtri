import serverless from 'serverless-http';
import { getUser } from '@netlify/identity';
import { createExpressApp } from '../../server/app';

const app = createExpressApp();
const handleExpress = serverless(app, {
  request(request: Record<string, unknown>, _event: unknown, context: { identityUser: unknown }) {
    request.identityUser = context.identityUser;
  },
});

export function normalizeApiPath(pathname: string): string {
  const path = pathname.replace(/^\/\.netlify\/functions\/api(?=\/|$)/, '/api');
  return path === '/api' || path.startsWith('/api/') ? path : `/api${path}`;
}

// The modern Functions runtime supplies the verified Identity request context.
// serverless-http provides real Node request/response streams for Express.
export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const identityUser = await getUser();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('host', url.host);
  requestHeaders.set('x-forwarded-proto', url.protocol.slice(0, -1));
  const result = await handleExpress({
    version: '2.0',
    rawPath: normalizeApiPath(url.pathname),
    rawQueryString: url.search.slice(1),
    headers: Object.fromEntries(requestHeaders),
    body: Buffer.from(await request.arrayBuffer()).toString('base64'),
    isBase64Encoded: true,
    requestContext: { http: { method: request.method, sourceIp: '' } },
  }, { identityUser }) as {
    statusCode: number;
    headers: Record<string, string>;
    cookies?: string[];
    body: string;
    isBase64Encoded: boolean;
  };
  const headers = new Headers(result.headers);
  for (const cookie of result.cookies ?? []) headers.append('set-cookie', cookie);
  return new Response(result.body ? Buffer.from(result.body, result.isBase64Encoded ? 'base64' : 'utf8') : null, {
    status: result.statusCode,
    headers,
  });
}
