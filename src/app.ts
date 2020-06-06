import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import mongoose from 'mongoose';
import { File, Game } from './helpers';

dotenv.config();

class App {
    server: Express;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.connectToMongo();
        this.proccessGameLogFile();
    }

    middlewares() {
        this.server.use(express.json());
    }

    async connectToMongo() {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0-ggn24.mongodb.net/talkradiotest?retryWrites=true&w=majority`, {
            autoIndex: false,
            autoReconnect: false,
            connectTimeoutMS: 10000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    proccessGameLogFile() {
        const gameLogFile = File.readFile('games.log', 'utf-8');
        const games = Game.proccessGameLogFile(gameLogFile);
        Game.setGames(games);
    }


    routes() {
        this.server.use(routes);
    }

}

export default new App().server;