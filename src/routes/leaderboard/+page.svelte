<script lang="ts">
	import type { Score } from '$lib/types';
	import { formatSeconds } from '$lib/utils';
	export let data;

	let scores: Score[] = data.scores;
	scores.sort((a: Score, b: Score) => a.time - b.time);
</script>

<table class="mt-8 h-fit w-[40rem] border-collapse border border-zinc-400">
	<thead>
		<tr>
			<th class="w-1/3 bg-orange-600 text-white">Place</th>
			<th class="w-1/3 bg-orange-600 text-white">Name</th>
			<th class="w-1/3 bg-orange-600 text-white">Time</th>
		</tr>
	</thead>
	<tbody>
		{#each scores as score, i (i)}
			<tr class="h-[3rem] text-center">
				<td class="border border-zinc-400">
					{i + 1}
				</td>
				<td class="border border-zinc-400">
					{score.name}
				</td>
				<td class="border border-zinc-400 font-mono">
					{formatSeconds(score.time)}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
