import { jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import type { PrepWiseDatabase } from '../server/db.js';

// Preserve the existing application's data model while moving it off local disk.
export const applicationState = pgTable('application_state', {
  id: text('id').primaryKey(),
  data: jsonb('data').$type<PrepWiseDatabase>().notNull(),
});
