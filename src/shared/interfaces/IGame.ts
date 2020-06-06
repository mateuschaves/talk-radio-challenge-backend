
export default interface IGame {
    [game: string]: {
        total_kills: number;
        players: Set<string> | string[];
        kills: {
            [player: string]: number
        }
    },
}