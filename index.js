#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Define colors for different file extensions
const extensionColors = {
    '.js': chalk.yellowBright,
    '.ts': chalk.gray,
    '.css': chalk.greenBright,
    '.json': chalk.cyan,
    '.md': chalk.green,
    '.jpg': chalk.red,
    '.jpeg': chalk.red
    // Add more extensions and colors as needed
};

function getColorForFile(filename) {
    const ext = path.extname(filename);
    return extensionColors[ext] || chalk.white; // Default to white if extension not found
}

function printTree(dir, indent = '') {
    const items = fs.readdirSync(dir).filter(file => !file.startsWith('.') && file !== 'node_modules' && file !== '.git');

    const directories = items.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
    const files = items.filter(file => !fs.statSync(path.join(dir, file)).isDirectory());

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

        let displayName;
        if (isDirectory) {
            displayName = chalk.blue(`./${item}`);
        } else {
            const colorFunc = getColorForFile(item);
            displayName = colorFunc(item);
        }

        console.log(`${indent}${last ? '└── ' : '├── '}${displayName}`);

        if (isDirectory) {
            printTree(fullPath, `${indent}${last ? '    ' : '│   '}`);
        }
    });
}

const targetPath = process.argv[2] || path.resolve();
const currentDirectoryName = path.basename(targetPath);
console.log(chalk.yellow(currentDirectoryName));
printTree(targetPath);