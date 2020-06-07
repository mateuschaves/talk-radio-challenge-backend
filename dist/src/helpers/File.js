"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _1 = require("./");
class File {
    setFileContent(content) {
        this.fileContent = content;
    }
    getFileContent() {
        return this.fileContent;
    }
    readFile(fileName, encoding) {
        try {
            const filePath = path_1.default.join(__dirname, `../assets/${fileName}`);
            _1.Log.info(`reading ${filePath}`);
            const file = fs_1.default.readFileSync(filePath, {
                encoding
            });
            this.setFileContent(file);
            return this.getFileContent();
        }
        catch (error) {
            throw new Error('file not found');
        }
    }
}
exports.default = new File();
//# sourceMappingURL=File.js.map