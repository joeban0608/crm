import { DatabaseAdmin, db } from '.';

export default class VisitorLogs extends DatabaseAdmin {
	constructor() {
		super(db);
	}

	async createLog(
		visitorId: string,
		eventType: string,
		eventTarget: string,
		eventData: object,
		url: string
	) {
		await this.database
			.insert(VisitorLogs._tables.visitorLogs)
			.values({
				visitor_id: visitorId,
				event_type: eventType,
				event_target: eventTarget,
				event_data: JSON.stringify(eventData),
				url,
				timestamp: new Date()
			})
			.returning();
	}
}
