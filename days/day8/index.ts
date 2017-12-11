import * as fs from 'fs';
import * as path from 'path';

const readFile = () => {
	const filePath = path.join(__dirname, '../../data/day8input.txt');
	return fs.readFileSync(filePath, {encoding: 'utf-8'});
};

const decrement = (decrementValue: number): Function => {
	return (input: number) => {
		return input - decrementValue;
	};
};

const increment = (incrementValue: number): Function => {
	return (input: number) => {
		return input + incrementValue;
	};
};

const comparator = (left, compareOperation, right): Boolean => {
	switch(compareOperation) {
		case '!=':
			return left !== right;
		case '==':
			return left === right;
		case '>=':
			return left >= right;
		case '<=':
			return left <= right;
		case '<':
			return left < right;
		case '>':
			return left > right;
		default:
			return false;
	}
};

const buildOperation = (operation: string, amount: string): Function => {
	const operationMap: Map<String,Function> = new Map<String,Function>([
		['inc', increment],
		['dec', decrement]
	]);

	return operationMap.get(operation)(amount);
};

export const day8 = () => {
	const result = {};
	let max = 0;

	const raw = readFile()
		.split('\n')
		.filter(rawInput => !!rawInput.trim());

	const input: any[] = raw.reduce((acc: any[], value: string) => {
		const values = value.split(' ');

		const operation = {
			target: values[0],
			operation: values[1],
			amount: parseInt(values[2], 10)
		};

		const condition = {
			left: values[4],
			comparatorOperation: values[5],
			right: parseInt(values[6], 10)
		};

		acc.push({operation, condition});

		return acc;
	},[]);

	input.forEach(value => {
		const operation = value.operation;
		const condition = value.condition;

		const conditionResult = comparator(result[condition.left] ? result[condition.left] : 0, condition.comparatorOperation, condition.right);

		if (conditionResult) {
			result[operation.target] = buildOperation(operation.operation, operation.amount)(result[operation.target] ? result[operation.target] : 0);
			max = result[operation.target] > max ? result[operation.target] : max;
		}
	});

	console.log(JSON.stringify(result, null, '\t'));
	console.log('max', max);
};
