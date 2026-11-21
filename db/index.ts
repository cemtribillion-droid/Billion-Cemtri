import { getDatabase } from '@netlify/database';
import { drizzle } from 'drizzle-orm/netlify-db';
import * as schema from './schema.js';

// Initialize lazily so health checks do not require a database connection.
function createClient() { return drizzle({ schema, client: getDatabase() }); }
let client: ReturnType<typeof createClient> | undefined;
export function getDatabaseClient() {
  return client ??= createClient();
}
