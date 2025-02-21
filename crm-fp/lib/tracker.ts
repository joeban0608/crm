import { BASE_API_URL } from './constant';

declare global {
	interface Window {
		pako: {
			deflate: (input: string) => Uint8Array;
		};
	}
}
type EventLog = {
	type: string;
	createAt: string;
	details: { [key: string]: unknown };
};

let startTime: number; // 記錄進入時間
const eventLogs: EventLog[] = []; // 追蹤事件的陣列
const MAX_BATCH_SIZE = 5000; // 設定批量大小

// function compressMessage(message: unknown) {
// 	if (window.pako) {
// 		const compressed = window.pako.deflate(JSON.stringify(message));
// 		return compressed;
// 	} else {
// 		throw new Error('pako is not defined');
// 	}
// }

export async function tracking(visitorInfo: { [key: string]: unknown }) {
	const visitorId = visitorInfo.id as string;
	if (!visitorId) throw new Error('visitorId is required when tracking');

	// 當頁面載入時，紀錄開始時間
	startTime = Date.now();
	await sendPageView(visitorId, 'init');

	// 監聽用戶離開頁面時，發送停留時間
	await window.addEventListener('beforeunload', () => {
		console.log('beforeunload'); // 重整或離開頁面觸發，無法 call listener
		// safari beforeunload 事件 reload 時會 error, 關閉網站可正常搜集資訊
		sendPageView(visitorId, 'beforeunload');
		return null;
	});

	await bindingAllEvents(visitorId);
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
			// referrer: document.referrer,
			duration: duration,
			viewType: pageViewType
		}
	});

	// 發送並清空 eventLogs
	postSendLogs({ visitorId, eventLogs });
	// postSendLogToPubsub({ visitorId, eventLogs });
	eventLogs.length = 0; // **清除陣列，避免累積**
	startTime = Date.now();
}

// async function postSendLogToPubsub(
// 	eventData: { visitorId: string; eventLogs: EventLog[] },
// 	topic_name_or_id = 'projects/seo-manager-429705/topics/fp-test'
// ) {
// 	try {
// 		const res = await fetch(`${BASE_API_URL}/api/pubsub/messages`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ topic_name_or_id, message: compressMessage(eventData) })
// 		});
// 		const getLogRes = await res.json();
// 		console.log('getLogRes', getLogRes);
// 		return getLogRes;
// 	} catch (error) {
// 		console.error('Error sending logs:', error);
// 	}
// }

async function postSendLogs(eventData: { visitorId: string; eventLogs: EventLog[] }) {
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

function bindingAllEvents(visitorId: string) {
	// 找出所有的事件類型
	const allEvents = new Set<string>();
	for (const key in window) {
		if (key.startsWith('on')) {
			allEvents.add(key.slice(2));
		}
	}

	// 設置監聽器來捕獲所有的事件
	allEvents.forEach((eventType) => {
		window.addEventListener(
			eventType,
			(e) => _handleEvent(e as Event, visitorId),
			true // `true` : 在捕獲階段觸發事件
		);
	});
}

function _handleEvent(event: Event, visitorId: string) {
	eventLogs.push({
		type: event.type,
		createAt: new Date().toISOString(),
		details: {
			// target: event.target,
			url: window.location.href,
			referrer: document.referrer,
			clientX: (event as MouseEvent).clientX || null,
			clientY: (event as MouseEvent).clientY || null,
			key: (event as KeyboardEvent).key || null,
			target: {
				name: event.target instanceof HTMLElement ? event.target.tagName : null,
				id: event.target instanceof HTMLElement ? event.target.id : null,
				class: event.target instanceof HTMLElement ? event.target.className : null,
				text: event.target instanceof HTMLElement ? event.target.innerText : null,
				href: event.target instanceof HTMLAnchorElement ? event.target.href : null,
				src: event.target instanceof HTMLImageElement ? event.target.src : null,
				alt: event.target instanceof HTMLImageElement ? event.target.alt : null,
				type: event.target instanceof HTMLInputElement ? event.target.type : null,
				checked: event.target instanceof HTMLInputElement ? event.target.checked : null,
				value: event.target instanceof HTMLInputElement ? event.target.value : null,
				placeholder: event.target instanceof HTMLInputElement ? event.target.placeholder : null,
				role: event.target instanceof HTMLElement ? event.target.getAttribute('role') : null,
				ariaLabel:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-label') : null,
				ariaRole:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-role') : null,
				ariaPressed:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-pressed') : null,
				ariaChecked:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-checked') : null,
				ariaExpanded:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-expanded') : null,
				ariaHidden:
					event.target instanceof HTMLElement ? event.target.getAttribute('aria-hidden') : null
			}
		}
	});

	// 每 MAX_BATCH_SIZE 記錄發送一次
	if (eventLogs.length >= MAX_BATCH_SIZE) {
		console.log(`event data >=${MAX_BATCH_SIZE}`, { visitorId, eventLogs });
		postSendLogs({ visitorId, eventLogs });
		eventLogs.length = 0; // 清空 eventLogs
	}
}
