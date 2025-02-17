import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import dgram from 'dgram';
import pako from 'pako';

const UDP_HOST = 'localhost';
const UDP_PORT = 41234;
const TARGET_NUMBER = 10;
let store = 0;
const udpServer = dgram.createSocket('udp4');
udpServer.on('error', (err) => {
	console.error(`伺服器錯誤:\n${err.stack}`);
	udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
	console.log(`伺服器收到來自 ${rinfo.address}:${rinfo.port} 的消息: ${msg}`);
});

udpServer.on('listening', () => {
	const address = udpServer.address();
	console.log(`伺服器正在監聽 ${address.address}:${address.port}`);
});

udpServer.bind(UDP_PORT); // 監聽固定的 41234 埠

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async (event) => {
	let flag = true;
	const req = event.request;
	const body = await req.json();
	if (!body.message) {
		return json({ error: 'message is required' }, { status: 400 });
	}
	console.log('body.message', body.message);
	const restoredMsg = JSON.parse(pako.inflate(body.message, { to: 'string' }));
	const bufferMsg = Buffer.from(restoredMsg.toString());
	const udpClient = dgram.createSocket('udp4'); // 使用臨時端口

	// 設置超時機制，確保客戶端在一定時間後自動關閉
	const timeout = setTimeout(() => {
		if (udpClient) {
			udpClient.close();
			console.log('客戶端超時已關閉');
		}
	}, 30000); // 30秒超時

	// 包裝在 Promise 中
	const sendUdpMessage = () =>
		new Promise((resolve, reject) => {
			udpClient.send(bufferMsg, UDP_PORT, UDP_HOST, (err) => {
				if (err) {
					console.error('UDP 傳輸錯誤:', err);
					reject('udp transport error');
				} else {
					const sum = parseInt(restoredMsg) + store;
					store = sum;
					if (sum >= TARGET_NUMBER) {
						console.log('已達到目標數字，結束 UDP 傳輸');
						flag = false;
						udpClient.close();
					}
					console.log('收到訊息:', restoredMsg);
					resolve('訊息已發送, 目前總和: ' + sum);
				}

				clearTimeout(timeout);
			});
		});

	try {
		const result = await sendUdpMessage();
		if (!flag) {
			return json({ message: '已達到目標數字，結束 UDP 傳輸，目前總和：' + store });
		}

		return json({ message: result });
	} catch (error) {
		return json({ error }, { status: 400 });
	}
};
