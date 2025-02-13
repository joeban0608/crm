<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="navbar bg-base-100 p-2 shadow">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">daisyUI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/blog">Blog</a></li>
		</ul>
	</div>
</nav>
<main class="p-4">
	{@render children()}
</main>
