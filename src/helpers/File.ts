import fs from 'fs';
import path from 'path';

import { EncondingOptions } from '../shared/types';

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
            const file = fs.readFileSync(path.join(__dirname, `../assets/${fileName}`), {
                encoding
            });
            this.setFileContent(file);
            return this.getFileContent();
        } catch (error) {
            return null;
        }
    }
}

export default new File();