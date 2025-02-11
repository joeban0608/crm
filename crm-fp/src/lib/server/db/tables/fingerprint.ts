import { DatabaseAdmin, db } from '..';

export default class Fingerprints extends DatabaseAdmin {
	// fingerprint_id: string;
	constructor() {
		super(db);
		// this.fingerprint_id = fingerprint_id;
	}

	async create(
		fingerprintId: string,
		useragent: string,
		data: string | null,
		serverData: string | null
	) {
		return await this.database
			.insert(Fingerprints._tables.fingerprint)
			.values({
				visitor_id: crypto.randomUUID(),
				fp_id: fingerprintId,
				useragent: useragent,
				data,
				server_data: serverData
			})
			.returning();
	}
}
