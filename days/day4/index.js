"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const readFile = () => {
    const filePath = path.join(__dirname, '../../data/day4input.txt');
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};
const transformText = (phrases) => {
    return phrases
        .split('\n')
        .filter(phrase => phrase.length > 0)
        .map(phrase => phrase.split(' ').filter(phraseItem => phraseItem.trim()));
};
const equalStrings = (word1, word2) => {
    if (word1.length !== word2.length) {
        return false;
    }
    if (word1 === word2) {
        return false;
    }
    let wordPlaceholder = word2;
    for (const char of word1) {
        wordPlaceholder = wordPlaceholder.replace(char, '');
    }
    return wordPlaceholder.trim().length === 0;
};
const compareStrings = (words, wordsMap) => {
    const checks = [];
    Object.keys(wordsMap).forEach((key, index) => {
        words.forEach((word, wordIndex) => {
            checks.push(equalStrings(key, word));
        });
    });
    return checks.indexOf(true) === -1;
};
exports.day4 = () => {
    const text = readFile();
    const sortedData = transformText(text);
    let counter = 0;
    let unDecodable = 0;
    sortedData.forEach((phrase, index) => {
        const phraseMap = {};
        let double = false;
        phrase.map(word => {
            if (Object.keys(phraseMap).indexOf(word) === -1) {
                phraseMap[word] = word;
            }
            else {
                double = true;
            }
        });
        if (!double) {
            unDecodable += compareStrings(phrase, phraseMap) ? 1 : 0;
        }
        counter += double ? 0 : 1;
    });
    console.log('counter for unique phrases :: Part 1', counter);
    console.log('unDecodable :: Part 2', unDecodable);
};
