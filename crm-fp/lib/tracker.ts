import { BASE_API_URL } from './constant';

export async function tracking(visitorInfo: { [key: string]: unknown }) {
	const visitorId = visitorInfo.id;
	// console.log('visitorId', visitorId);
	if (document && visitorId) {
		document.addEventListener('click', function (e) {
			const target = e.target as HTMLElement;
			if (!target) return;

			const eventData = {
				visitorId: visitorId,
				eventType: 'click',
				eventTarget: target.tagName,
				eventData: {
					x: e.clientX,
					y: e.clientY
				},
				url: window.location.href
			};
			console.log('eventData', eventData);

			fetch(`${BASE_API_URL}/api/log`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(eventData)
			});
		});
	}
}
