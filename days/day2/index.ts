interface MinMax {
	min: number;
	max: number;
}

const createMatrix = (values: string) => {
	const baseMatrix = [];
	const rows = values
		.split('\n')
		.filter(rowArray => rowArray.length > 0);

	rows.forEach((row, index) => {
		const rowValues = row.split('\t')
			.filter(value => value.trim())
			.map(value => parseInt(value, 10));

		baseMatrix.push(rowValues);
	});

	return baseMatrix;
};

const minmax = (numbers: number[]): MinMax => {
	const value: MinMax = {
		min: undefined,
		max: undefined
	};

	numbers.map(numberValue => {
		if (!value.max && !value.min) {
			value.max = numberValue;
			value.min = numberValue;
		} else if (numberValue < value.min) {
			value.min = numberValue;
		} else if (numberValue > value.max) {
			value.max = numberValue;
		}
	});

	return value;
};

const integerDivision = (numbers: number[]): number => {
	const resultTuple = [];

	numbers.forEach((currentValue, currentIndex) => {
		numbers.forEach((nextValue, index) => {
			if (currentIndex !== index) {
				if (Number.isInteger(currentValue / nextValue)) {
					resultTuple.push(currentValue / nextValue);
				}
			}
		});
	});

	return resultTuple.reduce(current => current);
};

export const day2 = (values: string) => {
	const matrix = createMatrix(values);
	const sum = matrix
		.map(row => minmax(row))
		.map(minMax => minMax.max - minMax.min)
		.reduce((current, next) => current + next);

	console.log(sum);
};

export const day2Part2 = (values: string) => {
	const matrix = createMatrix(values);
	const sum = matrix
		.map(row => integerDivision(row))
		.reduce((current, next) => current + next);

	console.log(sum);
};
