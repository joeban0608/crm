// import { EventLog } from "./tracker";

const BASE_API_URL = 'http://localhost:3000';

export async function getUserRequestInfo() {
	try {
		const res = await fetch(`${BASE_API_URL}/api/fingerprint`);
		const data = await res.json();
		if (!data) throw new Error('failed to get user request info');
		return data.serverData;
	} catch (e) {
		console.error('failed to get user request info', e);
	}
}

export async function postCreateFingerprint(fingerprint: Record<string, unknown>) {
	return fetch(`${BASE_API_URL}/api/fingerprint`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(fingerprint)
	});
}

// export async function postSendLogs(eventData: { visitorId: string; eventLogs: EventLog[] }) {
// 	try {
// 		await fetch(`${BASE_API_URL}/api/log`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(eventData)
// 		});
// 	} catch (error) {
// 		console.error('Error sending logs:', error);
// 	}
// }