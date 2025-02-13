import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import VisitorLogs, { type EventLog } from '$lib/server/db/visitorLogs';
import Visitors from '$lib/server/db/visitor';

export const GET: RequestHandler = async () => {
	// console.log('event', event);
	return json({ message: 'is log api' });
};

export const POST: RequestHandler = async (event) => {
	const logData = await event.request.json();
	const { visitorId, eventLogs, url, referrer } = logData;

	if (!visitorId) return json({ error: 'visitorId is required' }, { status: 400 });

	const admin = {
		db: {
			visitorLogs: new VisitorLogs(),
			visitors: new Visitors()
		}
	};

	const visitorData = await admin.db.visitors.queryVisitor(visitorId);
	if (!visitorData) return json({ error: 'Visitor not found' }, { status: 404 });

	const createLogRes = await admin.db.visitorLogs.createLog(
		visitorData.id,
		eventLogs as EventLog[],
		url,
		referrer
	);
	return json({ message: 'Event logged', data: createLogRes }, { status: 201 });
};
