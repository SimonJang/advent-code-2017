const createGrid = (maxNumbers: number) => {
	let xCoord = 0;
	let yCoord = 0;

	let previous = 0;
	let current = 0;

	let up = true;
	let down = false;

	let height = 1;
	let level = 1;

	let value = {};

	for (let x = 1; x <= maxNumbers; x++) {
		if (x < 2) {
			value = {
				[xCoord]: {
					[yCoord]: x
				}
			};
			current = x;
		} else if (x === 2) {
			current += 1;
			xCoord = 1;
		} else if (current > previous) {
			if (up) {
				if (level !== 1) {
					yCoord =+ 1;
					level += 1;

					const tempPrevious = previous;
					previous = current;
					current = tempPrevious;
				} else if (level === height) {
					up = false;
					down = true;

					level += 1;
					height += 1;
					yCoord =+ 1;
					previous = current;
					current = 1;
				} else if (level === 1) {
					previous = current;
					yCoord += 1;
					level += 1;
				}
			} else if (down) {
				if (level !== 1) {
					yCoord -= 1;
					level -= 1;

					const tempPrevious = previous;
					previous = current;
					current = tempPrevious;
				} else if (level === height) {
					up = false;
					down = true;

					level -= 1;
					yCoord -= 1;
					previous = current;
					current = 1;
				}
			}
		} else if (current <= previous) {
			if (down) {
				if (level === 1) {
					yCoord -= 1;
					current = 1;
					up = true;
					down = false;
					height += 1;
				} else if (level !== height) {
					yCoord -= 1;
					level -= 1;
				} else {
					xCoord -= 1;
					current += 1;
				}
			} else if (up) {
				if (level === 1) {
					xCoord += 1;
					current += 1;
				} else if (level !== height) {
					yCoord += 1;
					level += 1;
				} else if (level === height) {
					yCoord += 1;
					level += 1;
					height += 1;
					current = 1;

					up = false;
					down = true;
				} else {
					xCoord += 1;
					current += 1;
				}
			}
		}

		value = x > 1 ? saveValue(value, searchValue(value, xCoord, yCoord), xCoord, yCoord) : value;
	}

	// return value;
	return {x: xCoord, y: yCoord};
};

const saveValue = (value: any, result: number, xCoord: number, yCoord: number) => {
	if (value[xCoord]) {
		value[xCoord] = {
			...value[xCoord],
			...{[yCoord]: result}
		};
	} else {
		value[xCoord] = {
			[yCoord]: result
		};
	}

	return value;
};

const searchValue = (value: Object, xCoord: number, yCoord: number) => {
	const area1 = value[xCoord + 1] ? value[xCoord + 1][yCoord] : 0;
	const area2 = value[xCoord - 1] ? value[xCoord - 1][yCoord] : 0;
	const area3 = value[xCoord] ? value[xCoord][yCoord + 1] : 0;
	const area4 = value[xCoord] ? value[xCoord][yCoord - 1] : 0;
	const area5 = value[xCoord + 1] ? value[xCoord + 1][yCoord + 1] : 0;
	const area6 = value[xCoord - 1] ? value[xCoord - 1][yCoord + 1] : 0;
	const area7 = value[xCoord + 1 ] ? value[xCoord + 1 ][yCoord - 1] : 0;
	const area8 = value[xCoord - 1] ? value[xCoord - 1][yCoord - 1] : 0;

	const values = clean([area1,area2,area3,area4,area5,area6,area7,area8]);
	const result = values.reduce((previous, next) => previous + next);

	return result;
};

const clean = (value: any[]) => {
	return value.map(item => {
		if (!item) {
			return 0;
		} else {
			return item;
		}
	});
};

export const day3 = () => {
	const value = createGrid(100);
};
