<script lang="ts">
	import type { Cell } from '$lib/types';
	let { cell }: { cell: Cell } = $props();
</script>

<div
	class={`flex h-14 w-14 items-center justify-center text-2xl font-bold md:h-20 md:w-20 
${
	cell.fullCorrect
		? 'bg-orange-600 text-white'
		: cell.halfCorrect
			? 'bg-orange-100 text-orange-600'
			: 'bg-white text-black'
}`}
>
	{cell.letter}
</div>
