import db from './db';
import type { Score } from '../types';

export function getScores(): Score[] {
	const stmt = db.prepare('SELECT * FROM scores');
	return stmt.all() as Score[];
}

export function createScore(name: string, time: number): Score {
	const stmt = db.prepare('INSERT INTO scores (name, time) VALUES (?, ?)');
	const info = stmt.run(name, time);
	return { id: info.lastInsertRowid as number, name, time };
}
