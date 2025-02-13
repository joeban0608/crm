import { eq } from 'drizzle-orm';
import { DatabaseAdmin, db } from '.';

export default class Visitors extends DatabaseAdmin {
	constructor() {
		super(db);
	}

	async create(
		fingerprintId: string,
		ipAddress: string,
		useragent: string,
		browserFeature: string | null,
		serverFeature: string | null
	) {
		return await this.database
			.insert(Visitors._tables.visitors)
			.values({
				id: crypto.randomUUID(),
				ip_address: ipAddress,
				fingerprint: fingerprintId,
				user_agent: useragent,
				browser_feature: browserFeature,
				server_feature: serverFeature
			})
			.returning();
	}

	async queryVisitor(visitorId: string) {
		return this.database.query.visitors.findFirst({
			where: (visitor, { eq }) => eq(visitor.id, visitorId)
		});
	}
	async queryFp(fb_id: string) {
		return this.database.query.visitors.findFirst({
			where: (visitor, { eq }) => eq(visitor.fingerprint, fb_id)
		});
	}

	async updateTime(visitorId: string) {
		return await this.database
			.update(Visitors._tables.visitors)
			.set({
				updated_at: new Date()
			})
			.where(eq(Visitors._tables.visitors.id, visitorId))
			.returning();
	}
}
