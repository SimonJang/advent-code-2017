"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const R = require("ramda");
const readFile = () => {
    const filePath = path.join(__dirname, '../../data/day6input.txt');
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};
const formatData = (input) => {
    return input
        .replace('\n', '')
        .split('\t')
        .filter(value => value.trim())
        .map(value => parseInt(value, 10));
};
const distribute = (data, snapshots, turns) => {
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
        if (snapshots.filter(snapshot => R.equals(snapshot, data)).length > 0) {
            break;
        }
        snapshots.push([...data]);
    }
    return currentTurns;
};
const distributev2 = (data, snapshots, turns) => {
    let currentTurns = 0;
    let lastSnapshot;
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
        if (!lastSnapshot && snapshots.filter(snapshot => R.equals(snapshot, data)).length > 0) {
            lastSnapshot = [...data];
            currentTurns = 0;
        }
        snapshots.push([...data]);
    }
    return currentTurns;
};
exports.day6 = () => {
    const stringifiedData = readFile();
    const data = formatData(stringifiedData);
    const snapshots = [];
    const result = distributev2(data, snapshots, 1);
    console.log(result);
};
