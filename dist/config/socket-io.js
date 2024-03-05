"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeSocket = void 0;
const socket_io_client_1 = require("socket.io-client");
require("dotenv/config");
const __1 = require("..");
function InitializeSocket() {
    __1.logger.info(`conectando ${process.env.URL_SOCKET} ...`);
    const socket = (0, socket_io_client_1.io)(process.env.URL_SOCKET, {
        reconnection: true
    });
    socket.on('ping', (e) => {
        console.log('escuchado', e);
    });
    socket.on('connect_error', err => console.log(err));
    socket.on('connect_failed', err => console.log(err));
    socket.on('disconnect', err => console.log(err));
    return socket;
}
exports.InitializeSocket = InitializeSocket;
