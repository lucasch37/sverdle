<script lang="ts">
	import { fade } from 'svelte/transition';
	import { formatSeconds } from '$lib/utils';
	import { RotateCcwIcon, TrophyIcon } from '@lucide/svelte';
	let { open, seconds, restartGame }: { open: boolean; seconds: number; restartGame: () => void } =
		$props();

	let showNameInput = $state(false);
	let name = $state('');

	async function saveScore() {
		const response = await fetch('/api/score', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, time: seconds })
		});

		if (response.ok) {
			const newScore = await response.json();
			console.log(newScore);
			open = false;
		} else {
			const errorData = await response.json();
			console.log(errorData);
		}
	}
</script>

{#if open}
	<div transition:fade={{ duration: 100 }} class="fixed h-screen w-screen">
		<button
			class="fixed h-screen w-screen bg-black/40"
			onclick={() => (open = false)}
			aria-label="Close"
		>
		</button>
		{#if showNameInput}
			<div
				class="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
				transition:fade={{ duration: 100 }}
			>
				<div
					class="relative flex w-[20rem] flex-col items-center justify-center rounded-lg border border-orange-600 bg-white px-8 py-8 md:w-[30rem]"
				>
					<button
						class="absolute top-3 right-3 cursor-pointer"
						onclick={() => (showNameInput = false)}
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="1.2em"
							height="1.2em"
						>
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
							></path>
						</svg>
					</button>
					<h1 class="font-serif text-2xl text-orange-600 italic">Your Name (Initials):</h1>
					<input
						class="mt-6 w-[10rem] text-center text-xl uppercase"
						placeholder="XXX"
						maxlength="3"
						bind:value={name}
					/>

					<button
						class="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 bg-orange-600 py-2 text-white"
						onclick={saveScore}
					>
						Submit Score <TrophyIcon size={18} />
					</button>
				</div>
			</div>
		{:else}
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div
					class="relative flex w-[20rem] flex-col items-center justify-center rounded-lg bg-white py-8 md:w-[30rem]"
				>
					<button
						class="absolute top-3 right-3 cursor-pointer"
						onclick={() => (open = false)}
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="1.2em"
							height="1.2em"
						>
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
							></path>
						</svg>
					</button>
					<h1 class="font-serif text-3xl text-orange-600 italic">Congratulations!</h1>
					<p class="mt-6 text-lg text-zinc-500">
						You solved the Sverdle in: <span
							class="ml-1 border border-orange-600 px-2 py-1 font-mono text-xl text-orange-600"
							>{formatSeconds(seconds)}</span
						>
					</p>
					<div class="mt-8 flex w-full gap-4 px-8">
						<button
							class="flex w-1/2 cursor-pointer items-center justify-center gap-2 bg-orange-600 py-2 text-white"
							onclick={() => (showNameInput = true)}
						>
							Submit Score <TrophyIcon size={18} />
						</button>
						<button
							class="flex w-1/2 cursor-pointer items-center justify-center gap-2 border border-orange-600 py-2 text-orange-600"
							onclick={restartGame}
						>
							Play Again <RotateCcwIcon size={18} />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
