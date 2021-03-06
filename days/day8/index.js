"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const readFile = () => {
    const filePath = path.join(__dirname, '../../data/day8input.txt');
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};
const decrement = (decrementValue) => {
    return (input) => {
        return input - decrementValue;
    };
};
const increment = (incrementValue) => {
    return (input) => {
        return input + incrementValue;
    };
};
const comparator = (left, compareOperation, right) => {
    switch (compareOperation) {
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
const buildOperation = (operation, amount) => {
    const operationMap = new Map([
        ['inc', increment],
        ['dec', decrement]
    ]);
    return operationMap.get(operation)(amount);
};
exports.day8 = () => {
    const result = {};
    let max = 0;
    const raw = readFile()
        .split('\n')
        .filter(rawInput => !!rawInput.trim());
    const input = raw.reduce((acc, value) => {
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
        acc.push({ operation, condition });
        return acc;
    }, []);
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
