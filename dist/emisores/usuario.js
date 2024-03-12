"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioFoto = exports.usuario = void 0;
const __1 = require("..");
const usuario_controller_1 = require("../controller/usuario-controller");
const usuario = () => {
    __1.socket.on('nuevo:usuario:service', ({ usuarios, lectores, fotos }) => {
        __1.logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        console.log('recibiendo data', usuarios, lectores, fotos);
        (0, usuario_controller_1.usuarioInsert)(usuarios, lectores, fotos);
        //validate imagen
    });
};
exports.usuario = usuario;
const usuarioFoto = () => {
    __1.socket.on('nuevo:usuario-foto:service', ({ usuarios, lectores }) => {
        console.log('te escuche', 'nuevo:usuario-foto:service');
    });
};
exports.usuarioFoto = usuarioFoto;
