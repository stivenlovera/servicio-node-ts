"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeSocket = void 0;
const socket_io_client_1 = require("socket.io-client");
require("dotenv/config");
const __1 = require("..");
function InitializeSocket() {
    const socket = (0, socket_io_client_1.io)(process.env.URL_SOCKET, {
        reconnection: true
    });
    __1.logger.info(`conectando ${process.env.URL_SOCKET} ...`);
    socket.on('response', (a) => { console.log(a); });
    socket.on('connect_error', err => console.log(err));
    socket.on('connect_failed', err => console.log(err));
    socket.on('disconnect', err => console.log(err));
    return socket;
}
exports.InitializeSocket = InitializeSocket;
