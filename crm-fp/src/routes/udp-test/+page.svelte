<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let message = $state(0);
	let udpData: null | { message: unknown } = $state(null);
	async function sendMessage() {
		const response = await fetch('/api/udp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message })
		});

		const data = await response.json();
		udpData = data as { message: unknown };
		console.log('訊息已發送:', data);
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
	{#if udpData?.message}
		<p>{udpData.message}</p>
	{/if}
</main>
