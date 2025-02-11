import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const fingerprint = pgTable('fingerprint', {
	visitor_id: text('id').primaryKey(),
	fp_id: text('fp_id'),
	useragent: text('useragent'),
	data: text('data'),
	server_data: text('server_data'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
