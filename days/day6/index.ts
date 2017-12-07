import * as path from 'path';
import * as fs from 'fs';
import * as R from 'ramda'; // Need Ramda dependency for deepEqual

const readFile = () => {
	const filePath = path.join(__dirname, '../../data/day6input.txt');
	return fs.readFileSync(filePath, {encoding: 'utf-8'});
};

const formatData = (input: string) => {
	return input
		.replace('\n', '')
		.split('\t')
		.filter(value => value.trim())
		.map(value => parseInt(value, 10));
};

const distribute = (data: number[], snapshots: number[][], turns: number) => {
	let currentTurns = 0;

	while (true) {
		const sortedData = [...data];
		sortedData.sort((current, next) => next - current);

		let distributeIndex = data.indexOf(sortedData[0]);
		const distributedValue = data[distributeIndex];

		data[distributeIndex] = 0;
		distributeIndex = (distributeIndex += 1) % data.length;

		for (let counter = distributedValue; counter > 0; counter--) {
			data[distributeIndex % data.length] += 1;
			distributeIndex = (distributeIndex += 1) % data.length;
		}

		currentTurns += 1;

		if (snapshots.filter(snapshot => R.equals(snapshot, data)).length > 0) { // DeepEqual Ramda
			break;
		}

		snapshots.push([...data]);
	}

	return currentTurns;
};

const distributev2 = (data: number[], snapshots: number[][], turns: number) => {
	let currentTurns = 0;
	let lastSnapshot: number[];

	while (true) {
		const sortedData = [...data];
		sortedData.sort((current, next) => next - current);

		let distributeIndex = data.indexOf(sortedData[0]);
		const distributedValue = data[distributeIndex];

		data[distributeIndex] = 0;
		distributeIndex = (distributeIndex += 1) % data.length;

		for (let counter = distributedValue; counter > 0; counter--) {
			data[distributeIndex % data.length] += 1;
			distributeIndex = (distributeIndex += 1) % data.length;
		}

		currentTurns += 1;

		if (lastSnapshot && R.equals(lastSnapshot, data)) {
			break;
		}

		if (!lastSnapshot && snapshots.filter(snapshot => R.equals(snapshot, data)).length > 0) { // DeepEqual Ramda
			lastSnapshot = [...data];
			currentTurns = 0;
		}

		snapshots.push([...data]);
	}

	return currentTurns;
};

export const day6 = () => {
	const stringifiedData = readFile();
	const data = formatData(stringifiedData);
	const snapshots: number[][] = [];

	const result = distribute(data, snapshots, 1);
	console.log(result);

	const resultv2 = distributev2(data, snapshots, 1);
	console.log(resultv2);
};
