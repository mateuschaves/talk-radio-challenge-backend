"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Game', () => {
    it('should be able to show a game when the id passed exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/game/4');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            [`game_${4}`]: {
                "kills": [
                    { player: "Zeh", kills: 20 },
                    { player: "Isgalamido", kills: 19 },
                    { player: "Assasinu Credi", kills: 11 },
                    { player: "Dono da Bola", kills: 5 },
                ],
                "players": [
                    "Isgalamido",
                    "Dono da Bola",
                    "Zeh",
                    "Assasinu Credi"
                ],
                "total_kills": 100
            }
        });
    }));
    it('should not be able to show a game when the id passed not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/game/40');
        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            message: 'game not found'
        });
    }));
});
//# sourceMappingURL=game.test.js.map