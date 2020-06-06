import { File } from '../../src/helpers';

describe('File', () => {

    it('should be able to read a file', () => {
        const fileContent = File.readFile('games.log', 'utf8');

        expect(fileContent).toBeDefined();
        expect(fileContent.length > 0).toBe(true);
    });
});