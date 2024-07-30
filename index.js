#!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');
import fs from 'fs';
import path from 'path';

function printTree(dir, indent = '') {
    const items = fs.readdirSync(dir).filter(file => !file.startsWith('.'));

    // Separate directories and files
    const directories = items.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
    const files = items.filter(file => !fs.statSync(path.join(dir, file)).isDirectory());

    // Combine directories and files, directories first
    const sortedItems = [...directories, ...files].sort((a, b) => {
        const aStat = fs.statSync(path.join(dir, a));
        const bStat = fs.statSync(path.join(dir, b));

        if (aStat.isDirectory() && !bStat.isDirectory()) return -1;
        if (!aStat.isDirectory() && bStat.isDirectory()) return 1;
        return a.localeCompare(b);
    });

    sortedItems.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        const last = index === sortedItems.length - 1;

        // Append './' to directories
        const displayName = isDirectory ? `./${item}` : item;

        console.log(`${indent}${last ? '└── ' : '├── '}${displayName}`);

        if (isDirectory) {
            printTree(fullPath, `${indent}${last ? '    ' : '│   '}`);
        }
    });
}

const currentDirectoryPath = path.resolve();
const currentDirectoryName = path.basename(currentDirectoryPath);
console.log(currentDirectoryName);
printTree(currentDirectoryPath);

