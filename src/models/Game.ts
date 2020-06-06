import { Schema, model } from 'mongoose';

import { IGame } from '../shared/interfaces';

const GameSchema = new Schema({
    game: {
        id: String,
        total_kills: Number,
        players: [String],
        kills: {}
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

export default model<IGame>("Games", GameSchema);