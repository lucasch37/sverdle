<script lang="ts">
	import { page } from '$app/state';
</script>

<header>
	<nav>
		<ul class="flex justify-center gap-4 py-4">
			<li class={`${page.url.pathname === '/' ? 'text-zinc-500 underline' : 'text-zinc-400'}`}>
				<a href="/">Home</a>
			</li>
			<li
				class={`${page.url.pathname === '/leaderboard' ? 'text-zinc-500 underline' : 'text-zinc-400'}`}
			>
				<a href="/leaderboard">Leaderboard</a>
			</li>
		</ul>
	</nav>
</header>
