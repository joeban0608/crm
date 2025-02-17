import type { Handle } from '@sveltejs/kit';
import { WebSocketServer } from 'ws';
import dgram from 'dgram';
import pako from 'pako';

const UDP_HOST = 'localhost';
const UDP_PORT = 41234;
const TARGET_NUMBER = 10;
let store = 0;

// 啟動 UDP 伺服器
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
	console.log(`UDP 伺服器監聽中: ${address.address}:${address.port}`);
});
udpServer.bind(UDP_PORT); // 綁定 UDP 埠

// 建立 WebSocket 伺服器
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
	console.log('✅ WebSocket 連線成功');
	ws.send(JSON.stringify({ message: 'WebSocket 連線成功' }));

	ws.on('message', async (message) => {
		// 確保 message 是 Buffer
		const bufferData = Buffer.isBuffer(message)
			? message
			: Buffer.from(new Uint8Array(message instanceof ArrayBuffer ? message : new ArrayBuffer(0)));

		let restoredMsg: { message: unknown } | null = null;
		try {
			// 嘗試解壓縮
			try {
				restoredMsg = JSON.parse(pako.inflate(JSON.parse(bufferData.toString()), { to: 'string' })); // 直接解析 JSON
			} catch {
				console.error('decompressed error');
			}

			// 將數據轉換為 Buffer
			const udpClient = dgram.createSocket('udp4');

			const timeout = setTimeout(() => {
				udpClient.close();
				console.log('UDP 客戶端超時已關閉');
			}, 30000);

			// 傳送 UDP 訊息
			udpClient.send(JSON.stringify(restoredMsg), UDP_PORT, UDP_HOST, (err) => {
				if (err) {
					console.error('UDP 傳輸錯誤:', err);
					ws.send(JSON.stringify({ error: 'UDP 傳輸錯誤' }));
				} else {
					const sum = parseInt(restoredMsg?.message as string) + store;
					store = sum;
					ws.send(JSON.stringify({ message: `訊息已發送, 目前總和: ${sum}` }));

					if (sum >= TARGET_NUMBER) {
						console.log('已達到目標數字，結束 UDP 傳輸');
						ws.send(JSON.stringify({ message: `已達到目標數字，總和：${store}` }));
						udpClient.close();
					}
				}
				clearTimeout(timeout);
			});
		} catch (error) {
			console.error('處理訊息時發生錯誤:', error);
			ws.send(JSON.stringify({ error: '訊息解析錯誤' }));
		}
	});

	ws.on('close', () => {
		console.log('❌ WebSocket 連線已關閉');
	});
});

export const handle: Handle = async ({ event, resolve }) => {
	// CORS 处理
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization'
			}
		});
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-type';
		}
	});

	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	return response;
};
