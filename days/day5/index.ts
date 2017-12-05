import * as path from 'path';
import * as fs from 'fs';

const readFile = () => {
	const filePath = path.join(__dirname, '../../data/day5input.txt');
	return fs.readFileSync(filePath, {encoding: 'utf-8'});
};

const transformInputToMaze = (input: string): number[] => {
	return input
		.split('\n')
		.filter(value => value.length > 0)
		.map(value => parseInt(value, 10));
};

const jump = (maze: number[], jumps: number, position: number) => {
	let nextPosition = position;
	let currentJumps = jumps;
	let currentPosition = position;

	while(nextPosition < maze.length) {
		currentPosition = nextPosition;
		nextPosition += maze[nextPosition];
		currentJumps += 1;
		maze[currentPosition] += 1;
	}

	return currentJumps;
};

const jumpPart2 = (maze: number[], jumps: number, position: number) => {
	let nextPosition = position;
	let currentJumps = jumps;
	let currentPosition = position;

	while(nextPosition < maze.length) {
		currentPosition = nextPosition;
		nextPosition += maze[nextPosition];
		currentJumps += 1;
		maze[currentPosition] += maze[currentPosition] < 3 ?  1 : -1;
	}

	return currentJumps;
};

export const day5 = () => {
	const input = readFile();
	const maze = transformInputToMaze(input);

	const jumps = jump(maze, 0, 0);

	console.log(jumps);
};
