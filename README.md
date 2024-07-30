# File-Structure-tree  

## install  
> In terminal  
```bash
npm install -g node-structure-tree
```  

## Usage  
```bash
fstree
```  

> Result  

```plaintext
node-youtube
├── ./01Tutorial
│   ├── index.js
│   ├── math.js
│   └── server.js
├── ./02Tutorial
│   ├── ./files
│   │   ├── lorem.txt
│   │   ├── newReply.txt
│   │   └── starter.txt
│   └── index.js
├── ./test
│   ├── ./tes
│   │   ├── ./mr
│   │   │   ├── mr.js
│   │   │   └── sd.js
│   │   ├── fe.txt
│   │   └── te.txt
│   ├── generateTree.js
│   └── west.txt
├── generateTree.js
└── README.md
```


This Node.js script is designed to print a visual representation of the directory structure of the current directory where the script is located. Here's a step-by-step explanation:  

1. Imports and Function Definition:  
```js
const fs = require('fs');
const path = require('path');
```  

- `fs` is the Node.js File System module used to read and interact with the filesystem.  
- `path` is a Node.js module used to handle and transform file paths.  

2. `printTree` Function:  
```js
function printTree(dir, indent = '') {
    ...
}
```  

- This function takes a directory path `dir` and an optional `indent` string used for formatting the output.  

```js
const items = fs.readdirSync(dir).filter(file => !file.startsWith('.'));
```  

- Read all items ( files and directories ) in the given directory `dir`  
- Filters out hidden files ( those start with a dot `.` ).  

```js
const directories = items.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
const files = items.filter(file => !fs.statSync(path.join(dir, file)).isDirectory());
```  

- Separates items into directories and files by checking if each item is a directory or not directory.  

```js
const sortedItems = [...directories, ...files].sort((a, b) => {
    const aStat = fs.statSync(path.join(dir, a));
    const bStat = fs.statSync(path.join(dir, b));

    if (aStat.isDirectory() && !bStat.isDirectory()) return -1;
    if (!aStat.isDirectory() && bStat.isDirectory()) return 1;
    return a.localeCompare(b);
});
```   

- Combines directories and files into one list, with directories coming before files.  
- Sort the combined list. Directories come before files in the list.  
- If both are of the same type, it sorted Alphabetically.  

```js
sortedItems.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const last = index === sortedItems.length - 1;
```  

- Iterates over each item in the sorted list.
- Determines if the item is a directory and if it is the last item in the list ( for use formatting purposes ).  

```js
const displayName = isDirectory ? `./${item}` : item;

console.log(`${indent}${last ? '└── ' : '├── '}${displayName}`);
```  

- Set a `displayName` to prefix directions witch `./`.  
- Print the item with a grapical tree representation. Uses `└──` for the last item and `├──` for the others.  

```js
if (isDirectory) {
    printTree(fullPath, `${indent}${last ? '    ' : '│   '}`);
}
```  

- If the item is a directory, it recursively calls `printTree` to print its content, with adjusted indentation.  

3. Execution:  

```js
const currentDirectoryPath = path.dirname(__filename);
const currentDirectoryName = path.basename(currentDirectoryPath);
console.log(currentDirectoryName);
printTree(currentDirectoryPath);
```  

- `path.dirname(__filename)` gets the directory path of the current script.  
- `path.basename(currentDirectoryPath)` gets the name of that directory.  
- Print the name of this directory.  
- Call `printTree` to print the directory structure of the current directory.  

Overall, this script will produce a text-based tree view of the directory structure where it is executed, showing directories and files in a structured, indented format.  



