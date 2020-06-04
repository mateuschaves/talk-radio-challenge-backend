import fs from 'fs';
import path from 'path';

import { EncondingOptions } from '../shared/types';
import { Log } from './';

class File {

    private fileContent: string;

    setFileContent(content: string): void {
        this.fileContent = content;
    }

    getFileContent(): string {
        return this.fileContent;
    }

    public readFile(fileName: string, encoding: EncondingOptions): string | null {
        try {
            const filePath = path.join(__dirname, `../assets/${fileName}`);
            Log.info(`reading ${filePath}`);
            const file = fs.readFileSync(filePath, {
                encoding
            });
            this.setFileContent(file);
            return this.getFileContent();
        } catch (error) {
            Log.error(`file not found`);
            return null;
        }
    }
}

export default new File();