import { BASE_API_URL } from './constant';

export async function tracking(visitorInfo: { [key: string]: unknown }) {
	const visitorId = visitorInfo.id as string;
	if (!visitorId) throw new Error('visitorId is required when tracking');
	const eventLogs: { type: string; createAt: string; details: Event }[] = [];
	const allEvents = new Set();
	for (const key in window) {
		if (key.startsWith('on')) {
			allEvents.add(key.slice(2));
		}
	}

	// addEventListener when event trigger
	allEvents.forEach((eventType) => {
		window.addEventListener(
			eventType as string,
			(e) => {
				eventLogs.push({ type: e.type, createAt: new Date().toISOString(), details: e });
				if (eventLogs.length >= 1000) {
					const eventData = {
						visitorId,
						eventLogs,
						url: window.location.href,
						referrer: document.referrer
					};
					sendLogs(eventData);
					eventLogs.length = 0; // clean out eventLogs
				}
			},
			true // `true` : addEventListener when capture event (https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener)
		);
	});
}

async function sendLogs(eventData: {
	visitorId: string;
	eventLogs: { type: string; createAt: string; details: Event }[];
	url: string;
	referrer: string;
}) {
	return fetch(`${BASE_API_URL}/api/log`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(eventData)
	});
}
