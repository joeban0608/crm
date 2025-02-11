import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const fingerprint = pgTable('fingerprint', {
	visitor_id: text('id').primaryKey(),
	fp_id: text('fp_id'),
	useragent: text('useragent'),
	data: text('data'),
	server_feature: text('server_feature'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
