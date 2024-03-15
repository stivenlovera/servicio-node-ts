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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const __1 = require("..");
const usuario_controller_1 = require("../controller/usuario-controller");
const usuario = () => {
    __1.socket.on('store:usuario:service', (ILectorData) => __awaiter(void 0, void 0, void 0, function* () {
        __1.logger.info('SOCKET RECIBIENDO CANAL => store:usuario:web');
        console.log('recibiendo data', ILectorData);
        yield (0, usuario_controller_1.usuarioInsert)(ILectorData);
        //validate imagen
    }));
    __1.socket.on('get:usuario:service', (ILectorData) => {
        __1.logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });
    __1.socket.on('update:usuario:service', (ILectorData) => {
        __1.logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });
    __1.socket.on('delete:usuario:service', (ILectorData) => {
        __1.logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });
};
exports.usuario = usuario;
