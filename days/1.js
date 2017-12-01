"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day1 = (input) => {
    const validNumber = [];
    const charArray = input.split('');
    charArray.forEach((value, index) => {
        const currentValue = parseInt(value, 10);
        const nextValue = parseInt(charArray[(index + 1) % charArray.length], 10);
        if (currentValue === nextValue) {
            validNumber.push(currentValue);
        }
    });
    if (!validNumber.length) {
        return;
    }
    console.log(validNumber.length);
    console.log(validNumber.reduce((current, next) => current + next));
};
exports.day1Part2 = (input) => {
    const validNumber = [];
    const charArray = input.split('');
    const step = charArray.length / 2;
    console.log(step);
    charArray.forEach((value, index) => {
        const currentValue = parseInt(value, 10);
        const nextStep = (index + step) % charArray.length;
        const nextValue = parseInt(charArray[nextStep], 10);
        if (currentValue === nextValue) {
            validNumber.push(currentValue);
        }
    });
    console.log(validNumber.length);
    console.log(validNumber.reduce((current, next) => current + next));
};
