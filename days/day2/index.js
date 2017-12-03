"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMatrix = (values) => {
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
const minmax = (numbers) => {
    const value = {
        min: undefined,
        max: undefined
    };
    numbers.map(numberValue => {
        if (!value.max && !value.min) {
            value.max = numberValue;
            value.min = numberValue;
        }
        else if (numberValue < value.min) {
            value.min = numberValue;
        }
        else if (numberValue > value.max) {
            value.max = numberValue;
        }
    });
    return value;
};
const integerDivision = (numbers) => {
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
exports.day2 = (values) => {
    const matrix = createMatrix(values);
    const sum = matrix
        .map(row => minmax(row))
        .map(minMax => minMax.max - minMax.min)
        .reduce((current, next) => current + next);
    console.log(sum);
};
exports.day2Part2 = (values) => {
    const matrix = createMatrix(values);
    const sum = matrix
        .map(row => integerDivision(row))
        .reduce((current, next) => current + next);
    console.log(sum);
};
