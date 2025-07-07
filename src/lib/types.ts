export type Cell = {
	letter: string;
	halfCorrect: boolean;
	fullCorrect: boolean;
};

export type Score = {
	id: number;
	time: number;
	name: string;
};
