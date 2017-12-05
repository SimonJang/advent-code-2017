"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const readFile = () => {
    const filePath = path.join(__dirname, '../../data/day5input.txt');
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};
const transformInputToMaze = (input) => {
    return input
        .split('\n')
        .filter(value => value.length > 0)
        .map(value => parseInt(value, 10));
};
const jump = (maze, jumps, position) => {
    let nextPosition = position;
    let currentJumps = jumps;
    let currentPosition = position;
    while (nextPosition < maze.length) {
        currentPosition = nextPosition;
        nextPosition += maze[nextPosition];
        currentJumps += 1;
        maze[currentPosition] += maze[currentPosition] < 3 ? 1 : -1;
    }
    return currentJumps;
};
exports.day5 = () => {
    const input = readFile();
    const maze = transformInputToMaze(input);
    const jumps = jump(maze, 0, 0);
    console.log(jumps);
};
