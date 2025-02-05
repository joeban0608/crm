<script lang="ts">
	import { onMount } from 'svelte';
	import { fpPromise } from '../../dist/index';
	let fingerprint = $state<null | { useragent: string; id: string }>(null);
	onMount(async () => {
		fingerprint = await fpPromise();
	});
</script>

<h1>Welcome to crm-fp</h1>
{#if fingerprint}
	<p>hash id: {fingerprint.id}</p>
	<p>useragent: {JSON.stringify(fingerprint.useragent)}</p>
{/if}
