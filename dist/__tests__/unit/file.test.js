"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../src/helpers");
describe('File', () => {
    it('should be able to read a file', () => {
        const fileContent = helpers_1.File.readFile('games.log', 'utf8');
        expect(fileContent).toBeDefined();
        expect(fileContent.length > 0).toBe(true);
    });
    it('should not crash when file not exist', () => {
        try {
            const fileContent = helpers_1.File.readFile('not-found-games.log', 'utf8');
        }
        catch (error) {
            expect(error.message).toBe('file not found');
        }
    });
});
//# sourceMappingURL=file.test.js.map