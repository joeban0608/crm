import { BASE_API_URL } from './constant';

type EventLog = {
	type: string;
	createAt: string;
	details: { [key: string]: unknown };
};

let startTime: number; // 記錄進入時間
const eventLogs: EventLog[] = []; // 追蹤事件的陣列

export async function tracking(visitorInfo: { [key: string]: unknown }) {
	const visitorId = visitorInfo.id as string;
	if (!visitorId) throw new Error('visitorId is required when tracking');

	// 當頁面載入時，紀錄開始時間
	startTime = Date.now();
	console.log('sendPageView init');
	sendPageView(visitorId, 'init');

	// 監聽用戶離開頁面時，發送停留時間
	window.addEventListener('beforeunload', () => {
		console.log('beforeunload'); // 重整或離開頁面觸發，無法 call listener
		sendPageView(visitorId, 'beforeunload');
	});
	// window.addEventListener('popstate', () => {
	// 	console.log('popstate');
	// 	sendPageView(visitorId, 'popstate');
	// });
	// window.addEventListener('click', (event) => {
	// 	const target = event.target as HTMLElement;
	// 	const anchor = target.closest('a'); // 找到最近的 `<a>` 元素
	// 	if (anchor && anchor.href.startsWith(window.location.origin)) {
	// 		console.log('Navigating to:', anchor.href);
	// 		sendPageView(visitorId, 'navigate'); // 記錄站內點擊
	// 	}
	// });

	// document.addEventListener('visibilitychange', () => {
	// 	console.log('visibilitychange');
	// 	if (document.visibilityState === 'hidden') {
	// 		sendPageView(visitorId, 'visibilitychange');
	// 	}
	// });
}

function sendPageView(visitorId: string, pageViewType: string) {
	const endTime = Date.now();
	const duration = Math.round((endTime - startTime) / 1000); // 停留秒數

	// 建立 pageView 事件
	eventLogs.push({
		type: 'pageView',
		createAt: new Date().toISOString(),
		details: {
			url: window.location.href,
			referrer: document.referrer,
			duration: duration,
			viewType: pageViewType
		}
	});

	// 發送並清空 eventLogs
	sendLogs({ visitorId, eventLogs });
	eventLogs.length = 0; // **清除陣列，避免累積**
	startTime = Date.now();
}

async function sendLogs(eventData: { visitorId: string; eventLogs: EventLog[] }) {
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
