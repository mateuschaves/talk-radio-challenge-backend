"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const helpers_1 = require("./helpers");
app_1.default.listen(process.env.PORT, () => helpers_1.Log.info(`server started on port ${process.env.PORT}`));
//# sourceMappingURL=server.js.map