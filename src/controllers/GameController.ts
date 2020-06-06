import { Request, Response } from 'express';

class GameController {
    async show(request: Request, response: Response) {
        return response.status(200).json(request.body);
    }
}

export default new GameController();