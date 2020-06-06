export default interface IGame {
    total_kills: number;
    players: Set<string>;
    kills: {
        [player: string]: number
    }
}