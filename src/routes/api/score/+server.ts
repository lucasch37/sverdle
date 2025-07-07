import { json } from '@sveltejs/kit';
import { createScore } from '$lib/server/scores';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, time } = await request.json();

		if (!name || typeof name !== 'string' || name.trim() === '') {
			return json({ error: 'Name is required and must be a non-empty string.' }, { status: 400 });
		}
		if (!time) {
			return json({ error: 'Valid time is required.' }, { status: 400 });
		}

		const newScore = createScore(name, time);

		return json(newScore, { status: 201 });
	} catch (error) {
		console.error('Error creating score:', error);
		return json({ error: 'Failed to create score.' }, { status: 500 }); // Internal Server Error
	}
};
