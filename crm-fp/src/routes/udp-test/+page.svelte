<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import pako from 'pako';
	let { data }: { data: PageData } = $props();
	let message = $state(0);
	let wsMsg: null | { message?: unknown; error?: unknown } = $state(null);
	// let udpData: null | { message?: unknown; error?: unknown } = $state(null);
	function compressMessage(message: unknown) {
		const compressed = pako.deflate(JSON.stringify(message));
		return compressed;
	}

	let ws: WebSocket | null = null;

	onMount(() => {
		ws = new WebSocket('ws://localhost:8080');
		console.log('ws', ws);

		ws.onopen = () => {
			console.log('WebSocket 連線建立');
		};

		ws.onmessage = (event) => {
			console.log('後端回應:', event.data);
			try {
				wsMsg = JSON.parse(event.data);
			} catch (error) {
				wsMsg = { error };
			}
		};

		ws.onerror = (error) => {
			console.error('❌ WebSocket 錯誤:', error);
		};

		ws.onclose = () => {
			console.log('❌ WebSocket 連線已關閉');
		};
	});
	// async function sendMessage() {
	// 	const response = await fetch('/api/udp', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ message: compressMessage(message) })
	// 	});

	// 	const data = await response.json();
	// 	udpData = data as { message: unknown };
	// 	console.log('訊息已發送:', udpData);
	// }
	async function sendMessage() {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(compressMessage({ message })));
			console.log('📤 訊息已發送:', message);
		} else if (!message) {
			console.error('❌ 訊息發送失敗: ' + message);
		} else {
			console.error('❌ WebSocket 尚未連線');
		}
	}
</script>

<main>
	<h1>UDP 傳輸範例</h1>
	<label for="message">輸入數字:</label>
	<input
		class="input input-bordered w-full max-w-xs"
		type="number"
		id="message"
		bind:value={message}
	/>
	<button onclick={sendMessage}>發送</button>
	<div class="divider"></div>
	{#if wsMsg?.message}
		<p>{wsMsg.message}</p>
	{:else if wsMsg?.error}
		<p class="text-error">{JSON.stringify(wsMsg.error)}</p>
	{/if}
</main>
