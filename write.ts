// const fs = require("fs");
import * as fs from "fs"

// Writing to a file synchronously
const writeToFileSync = (filePath: string, content: string): void => {
    try {
        fs.writeFileSync(filePath, content);
        // TESTING
        console.log(`Successfully wrote to ${filePath}`);
    } catch (error) {
        console.error(`Error writing to file: ${error}`);
    }
};

// Writing to a file asynchronously
const writeToFileAsync = (filePath: string, content: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (error) => {
            if (error) {
                console.error(`Error writing to file: ${error}`);
                reject(error);
            } else {
                // TESTING
                console.log(`Successfully wrote to ${filePath}`);
                resolve();
            }
        });
    });
};

// module.exports = {
//     writeToFileSync,
//     writeToFileAsync
// }
export {
    writeToFileSync,
    writeToFileAsync
}