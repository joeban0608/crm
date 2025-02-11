import Fingerprints from '$lib/server/db/tables/fingerprint';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const serverData: { headers: { [key: string]: unknown }; ip: string } = {
		headers: {},
		ip: ''
	};
	event.request.headers.forEach((value, key) => {
		serverData.headers[key] = value;
	});
	serverData.ip = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
	// const ua =  request.headers.get('user-agent');
	return json({ serverData });
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
	const serverFeature = fpInfo.serverFeature ? JSON.stringify(fpInfo.serverFeature) : null;
	const res = await admin.db.fingerprint.create(id, useragent, rawData, serverFeature);
	// console.log('res', res);
	return json({ message: res }, { status: 201 });
}
