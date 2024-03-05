import { socket } from ".."
import dispositivoSocket from "../socket-io/dispositivo-socket"

export const dispositivo = () => {
    socket.on('dispositivo:web', (e) => { dispositivoSocket(e) })
}