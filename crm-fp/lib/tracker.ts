import { BASE_API_URL } from './constant';

type EventLog = {
	type: string;
	createAt: string;
	details: { [key: string]: unknown };
};

export async function tracking(visitorInfo: { [key: string]: unknown }) {
	const visitorId = visitorInfo.id as string;
	if (!visitorId) throw new Error('visitorId is required when tracking');

	const eventLogs: EventLog[] = [];

	// 確保首先追蹤 pageView 事件
	pageViewEvent(eventLogs, visitorId);

	// 監聽所有事件
	// addAllEvents(eventLogs, visitorId);
}

function pageViewEvent(eventLogs: EventLog[], visitorId: string) {
	eventLogs.push({
		type: 'pageView',
		createAt: new Date().toISOString(),
		details: {
			url: window.location.href,
			referrer: document.referrer
		}
	});

	sendLogs({ visitorId, eventLogs });
}

async function sendLogs(eventData: {
	visitorId: string;
	eventLogs: EventLog[];
	// url: string;
	// referrer: string;
}) {
	try {
		await fetch(`${BASE_API_URL}/api/log`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(eventData)
		});
	} catch (error) {
		console.error('Error sending logs:', error);
	}
}

// function addAllEvents(eventLogs: EventLog[], visitorId: string) {
// 	// 找出所有的事件類型
// 	const allEvents = new Set<string>();
// 	for (const key in window) {
// 		if (key.startsWith('on')) {
// 			allEvents.add(key.slice(2));
// 		}
// 	}

// 	// 設置監聽器來捕獲所有的事件
// 	allEvents.forEach((eventType) => {
// 		window.addEventListener(
// 			eventType,
// 			(e) => _handleEvent(e as Event, eventLogs, visitorId),
// 			true // `true` : 在捕獲階段觸發事件
// 		);
// 	});
// }

// function _handleEvent(event: Event, eventLogs: EventLog[], visitorId: string) {
// 	eventLogs.push({
// 		type: event.type,
// 		createAt: new Date().toISOString(),
// 		details: {
// 			// target: event.target,
// 			url: window.location.href,
// 			referrer: document.referrer,
// 			clientX: (event as MouseEvent).clientX || null,
// 			clientY: (event as MouseEvent).clientY || null,
// 			key: (event as KeyboardEvent).key || null,
// 			value: event.target instanceof HTMLInputElement ? event.target.value : null
// 		}
// 	});

// 	// 每1000條記錄發送一次
// 	if (eventLogs.length >= 1000) {
// 		sendLogs({ visitorId, eventLogs });
// 		eventLogs.length = 0; // 清空 eventLogs
// 	}
// }
