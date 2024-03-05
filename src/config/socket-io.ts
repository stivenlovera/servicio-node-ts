import { SocketOptions, io } from "socket.io-client";
import 'dotenv/config'
import { logger } from "..";

export function InitializeSocket() {
    logger.info(`conectando ${process.env.URL_SOCKET} ...`);
    const socket = io(process.env.URL_SOCKET!, {
        reconnection: true
    });

    socket.on('ping', (e) => {
        console.log('escuchado', e)
    })

    socket.on('connect_error', err => console.log(err))
    socket.on('connect_failed', err => console.log(err))
    socket.on('disconnect', err => console.log(err))

    return socket;
}



