import { readFile } from 'fs/promises';
import { join } from 'path';

export async function load() {
	try {
		const filePath = join(process.cwd(), 'static', 'words.txt');
		const fileContent = await readFile(filePath, 'utf-8');
		const words = fileContent.split(/\s+/).filter((word) => word.length > 0);

		return {
			words
		};
	} catch (error) {
		console.error('Error reading file:', error);
		return {
			words: []
		};
	}
}
