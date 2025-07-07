import { getScores } from '$lib/server/scores';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const scores = getScores();
		return {
			scores: scores
		};
	} catch (error) {
		console.error('Error loading scores for page:', error);
		return {
			scores: [],
			error: 'Failed to load scores.'
		};
	}
};
