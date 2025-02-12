// import Fingerprints from '$lib/server/db/fingerprint';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Visitors from '$lib/server/db/visitor';

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

export async function POST(event) {
	const ipAddress = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
	const admin = {
		db: {
			// fingerprint: new Fingerprints(),
			visitor: new Visitors()
		}
	};
	// console.log('admin', admin);

	const fpInfo = await event.request.json();
	if (!fpInfo.id) return json({ error: 'fingerprintId is required' }, { status: 400 });
	if (!fpInfo.useragent) return json({ error: 'useragent is required' }, { status: 400 });
	const { id, useragent }: { id: string; useragent: string; data: string; serverData: string } =
		fpInfo;

	const queryFpRes = await admin.db.visitor.queryFp(fpInfo.id);
	if (queryFpRes?.fingerprint) {
		await admin.db.visitor.updateTime(queryFpRes.id);
		return json({ message: 'fingerprint already exists', data: queryFpRes }, { status: 200 });
	}

	const rawData = fpInfo.rawData ? JSON.stringify(fpInfo.rawData) : null;
	const serverFeature = fpInfo.serverFeature ? JSON.stringify(fpInfo.serverFeature) : null;
	const createVisitorRes = await admin.db.visitor.create(
		id,
		ipAddress,
		useragent,
		rawData,
		serverFeature
	);
	console.log('createVisitorRes', createVisitorRes);
	if (!createVisitorRes?.length || !createVisitorRes[0]?.id) {
		return json({ message: 'created visitor is failed', data: createVisitorRes }, { status: 200 });
	}
	return json({ message: 'fingerprint created', data: createVisitorRes[0] }, { status: 201 });
}
