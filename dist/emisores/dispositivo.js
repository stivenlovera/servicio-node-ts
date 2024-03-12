"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispositivo = void 0;
const __1 = require("..");
const dispositivo_controller_1 = __importDefault(require("../controller/dispositivo-controller"));
const dispositivo = () => {
    __1.socket.on('dispositivo:web', (e) => { (0, dispositivo_controller_1.default)(e); });
};
exports.dispositivo = dispositivo;
