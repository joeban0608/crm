<script lang="ts">
	import { onMount } from 'svelte';
	import { fpPromise } from '../../dist/index';
	import { buildFingerprintStructure, type FileTreeItem } from '$lib/helper';
	import type { PageData } from './$types';

	let fingerprint = $state<null | { [key: string]: any }>(null);
	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const serverData = {
			client_ip: data.clientIp
		};
		fingerprint = await fpPromise(serverData);
		if (fingerprint) {
		}
		// console.log('fingerprint', fingerprint);
	});
</script>

<h1 class="my-4 text-2xl font-bold">Welcome to crm-fp</h1>
<form method="POST" action="?/createFp">
	<input class="input" name="id" value={fingerprint?.id || ''} />
	<input
		class="input"
		name="useragent"
		value={fingerprint?.useragent ? JSON.stringify(fingerprint?.useragent) : ''}
	/>
	<input
		class="input"
		name="data"
		value={fingerprint?.rawData ? JSON.stringify(fingerprint?.rawData) : ''}
	/>
	<input class="input" name="serverData" value={fingerprint?.serverData || ''} />
	<button class="btn">Submit</button>
</form>
{#snippet folder(fileInfo: FileTreeItem)}
	<li>
		<details open>
			<summary>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
					/>
				</svg>
				{fileInfo.name}
			</summary>
			<ul>
				{#if fileInfo.children}
					{#each fileInfo.children as child}
						{#if child.type === 'folder'}
							{@render folder(child)}
						{:else}
							{@render file(child)}
						{/if}
					{/each}
				{/if}
			</ul>
		</details>
	</li>
{/snippet}

{#snippet file(fileInfo: FileTreeItem)}
	<li>
		<button
			class=""
			onclick={() => {
				if (!fileInfo.value) return;
				if (navigator?.clipboard?.writeText) {
					navigator.clipboard.writeText(fileInfo.value);
					alert('Copied to clipboard: ' + fileInfo.name);
				}
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-4 w-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
				/>
			</svg>
			<p class="truncate">
				{fileInfo.name}: {fileInfo.value}
			</p>
		</button>
	</li>
{/snippet}

{#if fingerprint}
	{@const fingerprintStructure = buildFingerprintStructure(fingerprint)}
	<ul class="menu menu-xs bg-base-200 w-full rounded-lg">
		{#each fingerprintStructure as fileInfo}
			{#if fileInfo.type === 'folder'}
				{@render folder(fileInfo)}
			{:else}
				{@render file(fileInfo)}
			{/if}
		{/each}
	</ul>
{/if}

<style>
</style>
