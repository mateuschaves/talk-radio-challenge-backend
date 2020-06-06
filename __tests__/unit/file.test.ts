import { File } from '../../src/helpers';

describe('File', () => {

    it('should be able to read a file', () => {
        const fileContent = File.readFile('games.log', 'utf8');

        expect(fileContent).toBeDefined();
        expect(fileContent.length > 0).toBe(true);
    });

    it('should not crash when file not exist', () => {
        try {
            const fileContent = File.readFile('not-found-games.log', 'utf8');
        } catch (error) {
            expect(error.message).toBe('file not found');
        }
    });
});