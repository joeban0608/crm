import { DatabaseAdmin, db } from '.';
export type EventLog = { type: string; createAt: string; details: Event };
export default class VisitorLogs extends DatabaseAdmin {
	constructor() {
		super(db);
	}

	async createLog(visitorId: string, eventLogs: EventLog[], url: string, referrer?: string) {
		await this.database
			.insert(VisitorLogs._tables.visitorLogs)
			.values({
				visitor_id: visitorId,
				event_logs: eventLogs,
				url,
				referrer: referrer ?? null
			})
			.returning();
	}
}
