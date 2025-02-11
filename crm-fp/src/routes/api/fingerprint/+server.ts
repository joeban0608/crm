import Fingerprints from '$lib/server/db/tables/fingerprint';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response();
};

export async function POST({ request }) {
	const admin = {
		db: {
			fingerprint: new Fingerprints()
		}
	};
	// console.log('admin', admin);

	const fpInfo = await request.json();
	// console.log('fpInfo', fpInfo);

	if (!fpInfo.id) return json({ error: 'fingerprintId is required' }, { status: 400 });
	if (!fpInfo.useragent) return json({ error: 'useragent is required' }, { status: 400 });

	const { id, useragent }: { id: string; useragent: string; data: string; serverData: string } =
		fpInfo;

	const rawData = fpInfo.rawData ? JSON.stringify(fpInfo.rawData) : null;
	const serverData = fpInfo.serverData ? JSON.stringify(fpInfo.serverData) : null;
	const res = await admin.db.fingerprint.create(id, useragent, rawData, serverData);
	// console.log('res', res);
	return json({ message: res }, { status: 201 });
}
