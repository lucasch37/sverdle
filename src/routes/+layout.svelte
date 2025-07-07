<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex flex-1 justify-center">
		{@render children()}
	</main>

	<footer class="flex justify-center py-4 text-zinc-400">
		<p>Sverdle - Lucas Chen</p>
	</footer>
</div>
