<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	let { data }: { data: PageData } = $props();
	import { fpPromise, tracking } from '../../../../dist/index';
	import { onMount } from 'svelte';
	onMount(async () => {
		const visitorInfo = await fpPromise();
		if (visitorInfo) {
			await tracking(visitorInfo);
		}
	});
</script>

<h1>Blog {page.params.slug} Page</h1>
