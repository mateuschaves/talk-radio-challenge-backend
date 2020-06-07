"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = __importDefault(require("signale"));
class Log {
    info(message) {
        return signale_1.default.info(`[${new Date()}] ${message}`);
    }
    error(message) {
        return signale_1.default.error(`[${new Date()}] ${message}`);
    }
    warn(message) {
        return signale_1.default.warn(`[${new Date()}] ${message}`);
    }
}
exports.default = new Log();
//# sourceMappingURL=Log.js.map