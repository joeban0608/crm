import type { PageServerLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function convertToJSON(obj: Record<string, any>): unknown {
// 	if (typeof obj !== 'object' || obj === null) {
// 		return obj;
// 	}

// 	if (Array.isArray(obj)) {
// 		return obj.map(convertToJSON);
// 	}

// 	const jsonObj: Record<string, unknown> = {};
// 	for (const key in obj) {
// 		if (typeof (obj as Record<string, unknown>)[key] === 'function') {
// 			jsonObj[key] = 'Function';
// 		} else if ((obj as Record<string, unknown>)[key] instanceof Request) {
// 			jsonObj[key] = {
// 				method: obj[key].method,
// 				url: obj[key].url,
// 				headers: Object.fromEntries(obj[key].headers),
// 				destination: obj[key].destination,
// 				referrer: obj[key].referrer,
// 				referrerPolicy: obj[key].referrerPolicy,
// 				mode: obj[key].mode,
// 				credentials: obj[key].credentials,
// 				cache: obj[key].cache,
// 				redirect: obj[key].redirect,
// 				integrity: obj[key].integrity,
// 				keepalive: obj[key].keepalive,
// 				isReloadNavigation: obj[key].isReloadNavigation,
// 				isHistoryNavigation: obj[key].isHistoryNavigation,
// 				signal: { aborted: obj[key].signal.aborted }
// 			};
// 		} else if (obj[key] instanceof URL) {
// 			jsonObj[key] = {
// 				href: obj[key].href,
// 				origin: obj[key].origin,
// 				protocol: obj[key].protocol,
// 				username: obj[key].username,
// 				password: obj[key].password,
// 				host: obj[key].host,
// 				hostname: obj[key].hostname,
// 				port: obj[key].port,
// 				pathname: obj[key].pathname,
// 				search: obj[key].search,
// 				searchParams: Object.fromEntries(obj[key].searchParams)
// 				// hash: obj[key].hash
// 			};
// 		} else {
// 			jsonObj[key] = convertToJSON(obj[key]);
// 		}
// 	}

// 	return jsonObj;
// }
export const load = (async (route) => {
	// console.log('route info', convertToJSON(route), null, 2);
	// console.log('t', JSON.stringify(convertToJSON(t), null, 2)); // get ip

	// 嘗試從 headers 獲取真實 IP
	let clientIp = route.getClientAddress();

	// 嘗試從 X-Forwarded-For 獲取真實 IP
	const forwardedFor = route.request.headers.get('x-forwarded-for');
	if (forwardedFor) {
		clientIp = forwardedFor.split(',')[0].trim(); // 取得第一個 IP
	}

	console.log('clientIp', clientIp);

	return { clientIp };
}) satisfies PageServerLoad;
