"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const __1 = require("..");
const usuario_controller_1 = __importDefault(require("../controller/usuario-controller"));
const usuario = () => {
    __1.socket.on('nuevo:usuario:service', ({ usuarios, lectores }) => {
        console.log('te escuche', 'nuevo:usuario:service');
        (0, usuario_controller_1.default)(usuarios, lectores);
    });
};
exports.usuario = usuario;
