<script lang="ts">
	import CongratsModal from '$lib/components/CongratsModal.svelte';
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { formatSeconds } from '$lib/utils';
	import type { Cell } from '$lib/types';
	import SverdleCell from '$lib/components/SverdleCell.svelte';
	import { RotateCcwIcon } from '@lucide/svelte';
	export let data;

	let words = data.words;
	let currentRow = 0;
	let currentCol = 0;
	let solved = false;
	let seconds = 0;
	let congratsOpen = false;

	let interval: ReturnType<typeof setInterval>;
	onMount(() => {
		interval = setInterval(() => {
			seconds += 1;
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});

	function checkWord(word: string) {
		return words.includes(word.trim().toLowerCase());
	}

	let answer = words[Math.floor(Math.random() * words.length)].toLowerCase();

	let alerts: string[] = [];

	const emptyCell = (): Cell => ({
		letter: '',
		halfCorrect: false,
		fullCorrect: false
	});

	const emptyRow = (): Cell[] =>
		Array(5)
			.fill(null)
			.map(() => emptyCell());

	let grid: Cell[][] = Array.from({ length: 6 }, emptyRow);

	function handleKeydown(event: KeyboardEvent) {
		if (solved) return;

		const key = event.key;

		if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
			grid[currentRow][currentCol].letter = key.toUpperCase();
			currentCol += 1;
		} else if (key === 'Backspace' && currentCol > 0) {
			currentCol -= 1;
			grid[currentRow][currentCol].letter = '';
		} else if (key === 'Enter' && currentCol === 5) {
			let word = grid[currentRow].map((cell) => cell.letter).join('');
			if (checkWord(word)) {
				currentRow += 1;
				currentCol = 0;
				handleSubmit(currentRow - 1, word);
			} else {
				alerts.push('Not in word list');
				alerts = [...alerts];
				setTimeout(() => {
					alerts.shift();
					alerts = [...alerts];
				}, 1200);
			}
		}
	}

	function handleSubmit(row: number, word: string) {
		for (let i = 0; i < 5; i++) {
			if (answer.includes(grid[row][i].letter.toLowerCase())) {
				grid[row][i].halfCorrect = true;
			}
		}

		for (let i = 0; i < 5; i++) {
			if (grid[row][i].letter.toLowerCase() === answer[i]) {
				grid[row][i].fullCorrect = true;
				let count = 0;
				let matches = answer.match(new RegExp(grid[row][i].letter.toLowerCase(), 'g'));
				let amount = matches ? matches.length : 0;
				for (let j = 0; j < 5; j++) {
					if (grid[row][i].letter == grid[row][j].letter && j !== i) {
						count++;
						if (count >= amount) {
							console.log(count, amount);
							grid[row][j].halfCorrect = false;
						}
					}
				}
			}
		}

		if (word === answer.toUpperCase()) {
			clearInterval(interval);
			solved = true;
			congratsOpen = true;
			return;
		}

		if (currentRow === 6) {
			clearInterval(interval);
			alerts.push(answer.toUpperCase());
			alerts = [...alerts];
			setTimeout(() => {
				alerts.shift();
				alerts = [...alerts];
			}, 3000);
		}
	}

	function restartGame() {
		grid = Array.from({ length: 6 }, emptyRow);
		currentRow = 0;
		currentCol = 0;
		solved = false;
		seconds = 0;
		congratsOpen = false;

		clearInterval(interval);
		interval = setInterval(() => {
			seconds += 1;
		}, 1000);

		answer = words[Math.floor(Math.random() * words.length)].toLowerCase();
	}
</script>

<svelte:head>
	<title>Sverdle</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<section class="flex flex-col items-center justify-center">
	<h1 class="mb-8 font-serif text-5xl text-orange-600 italic">Sverdle</h1>
	<div class="grid grid-cols-5 gap-px bg-zinc-400 p-px">
		{#each grid as row, rowIndex (rowIndex)}
			{#each row as cell, colIndex (colIndex)}
				<SverdleCell {cell} />
			{/each}
		{/each}
	</div>
	<div class="mt-8 border border-orange-600 px-4 py-2 font-mono text-2xl text-orange-600">
		{formatSeconds(seconds)}
	</div>
	<div class="mt-4">
		<RotateCcwIcon size={24} class="cursor-pointer text-orange-600" onclick={restartGame} />
	</div>
	{#each alerts as alert, i (i)}
		<div
			transition:fade={{ duration: 100 }}
			class="absolute top-[10%] border border-orange-600 bg-white px-4 py-2 font-medium text-orange-600"
			style={`top: ${10 + i * 5}%`}
		>
			{alert}
		</div>
	{/each}
	<CongratsModal open={congratsOpen} {seconds} {restartGame} />
</section>
