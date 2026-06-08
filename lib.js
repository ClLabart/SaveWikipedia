import fs from 'fs';
import readline from 'readline';

// Read only the first line on a file
const getFirstLine = async (pathToFile) => {
    const readable = fs.createReadStream(pathToFile);
    const reader = readline.createInterface({ input: readable });
    const line = await new Promise((resolve) => {
        reader.on('line', (line) => {
            reader.close();
            resolve(line);
        });
    });
    readable.close();
    return line;
}

export { getFirstLine };