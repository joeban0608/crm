<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { fpPromise, tracking } from '../../../dist/index';
	import { onMount } from 'svelte';
	// onMount(async () => {
	// 	const visitorInfo = await fpPromise();
	// 	if (visitorInfo) {
	// 		await tracking(visitorInfo);
	// 	}
	// });
</script>

{#snippet linkSnippet(link: string, title: string)}
	<a href={link} class="btn">{title} </a>
{/snippet}

<h1>Blog page</h1>
<details open>
	<summary></summary>
	<ul class="bg-base-100 grid grid-cols-4 gap-2">
		{#each Array.from({ length: 12 }) as _, i}
			<!-- 使用 linkSnippet 模板 -->
			{@render linkSnippet(`/blog/${i}`, `Blog ${i}`)}
		{/each}
	</ul>
</details>
