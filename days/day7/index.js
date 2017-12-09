"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const R = require("ramda");
const readFile = () => {
    const filePath = path.join(__dirname, '../../data/day7input.txt');
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};
const getName = (input) => {
    const end = input.indexOf('(');
    return input.slice(0, end).trim();
};
const getWeight = (input) => {
    const start = input.indexOf('(');
    const end = input.indexOf(')');
    return parseInt(input.slice(start + 1, end), 10);
};
const getDependencies = (input) => {
    if (input.indexOf('>') === -1) {
        return undefined;
    }
    const result = input.slice(input.indexOf('>') + 1)
        .split(',')
        .map(value => value.trim())
        .filter(value => value.trim());
    return result;
};
const transformData = (input) => {
    return input.split('\n')
        .filter(value => value.trim());
};
const buildItem = (input) => {
    const parsedData = {
        weight: getWeight(input),
        name: getName(input)
    };
    const branches = getDependencies(input);
    if (branches) {
        parsedData.branches = branches;
    }
    return parsedData;
};
const convertStringDepToWeight = (dep, all) => {
    return R.find((branch) => branch.name === dep)(all).weight;
};
const findAllDeps = (tree, deps) => {
    let newDeps = [...deps];
    for (const dep of deps) {
        const depOfDep = R.find((item) => dep === item.name)(tree);
        if (depOfDep && depOfDep.branches) {
            newDeps = R.union(newDeps, depOfDep.branches);
        }
    }
    if (newDeps.length !== deps.length) {
        return findAllDeps(tree, newDeps);
    }
    return deps;
};
const analyseTree = (tree, rootObject) => {
    const searchTree = {};
    const treeWithWeights = [];
    const rootLevel = {};
    for (const deps of rootObject.branches) {
        const rootDep = R.find((item) => item.name === deps)(tree);
        rootLevel[rootDep.name] = findAllDeps(tree, rootDep.branches)
            .map(dep => R.find((item) => dep === item.name)(tree).weight);
    }
    const reducedRoot = Object.assign({}, rootLevel);
    const comparator = [];
    for (const key of Object.keys(rootLevel)) {
        const rootDep = R.find((item) => item.name === key)(tree);
        reducedRoot[key] = reducedRoot[key].reduce((current, next) => current + next) + rootDep.weight;
        comparator.push(reducedRoot[key]);
    }
    let badValue;
    let badString;
    let diff;
    comparator.sort((a, b) => b - a)
        .forEach((value, index) => {
        if (comparator.lastIndexOf(value) === comparator.indexOf(value)) {
            badValue = value;
            diff = value - comparator[(index + 1) % comparator.length] !== 0 ? value - comparator[(index + 1) % comparator.length] : value - comparator[(index + 2) % comparator.length];
        }
    });
    Object.keys(reducedRoot).forEach(key => {
        if (reducedRoot[key] === badValue) {
            badString = key;
        }
    });
    const options = rootLevel[badString].map(value => {
        if (rootLevel[badString].indexOf(value - diff) !== -1) {
            return {
                value,
                existing: value + diff,
                operation: '-'
            };
        }
        return undefined;
    })
        .filter(value => value !== undefined)
        .map(value => value.existing)
        .sort((a, b) => a - b);
    const uniques = R.uniq(options);
    console.log(JSON.stringify(uniques, null, '\t'));
};
exports.day7 = () => {
    const stringifiedData = readFile();
    const data = transformData(stringifiedData);
    const tree = data.map(row => buildItem(row));
    const itemsWithBranches = tree.filter(item => item.branches);
    const itemsWithoutBranches = tree.filter(item => !item.branches);
    const root = itemsWithBranches.filter(value => {
        const filterResult = itemsWithBranches.filter(itemsWithDeps => itemsWithDeps.branches.indexOf(value.name) === -1);
        return filterResult.length === itemsWithBranches.length;
    });
    analyseTree(tree, root[0]);
};
