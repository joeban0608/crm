<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	let { data }: { data: PageData } = $props();
	$effect(() => {
		console.log('page', page.params.slug);
	});
</script>

<h1>Blog {page.params.slug} Page</h1>
