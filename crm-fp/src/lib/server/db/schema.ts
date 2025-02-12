import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, serial, jsonb } from 'drizzle-orm/pg-core';

export const fingerprint = pgTable('fingerprint', {
	visitor_id: text('id').primaryKey(),
	fp_id: text('fp_id'),
	useragent: text('useragent'),
	data: text('data'),
	server_feature: text('server_feature'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const visitors = pgTable('visitors', {
	id: text('id').primaryKey(),
	fingerprint: text('fingerprint'),
	ip_address: text('ip_address'),
	user_agent: text('user_agent'),
	data: jsonb('data'),
	server_feature: jsonb('server_feature'),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow()
});

export const visitorLogs = pgTable('visitor_logs', {
	id: serial('id').primaryKey(),
	visitor_id: text('visitor_id').references(() => visitors.id, {
		onDelete: 'cascade'
	}),
	event_type: text('event_type'),
	event_target: text('event_target'),
	event_data: jsonb('event_data'),
	url: text('url'),
	timestamp: timestamp('timestamp').notNull().defaultNow()
});

export const visitorLogsRelations = relations(visitorLogs, ({ one }) => ({
	visitor: one(visitors, {
		fields: [visitorLogs.visitor_id],
		references: [visitors.id]
	})
}));
