import IRank from './IRank';
export default interface IGame {
    [game: string]: {
        total_kills: number;
        players: Set<string> | string[];
        kills: IRank[]
    },
}