import { socket } from ".."
import dispositivoSocket from "../controller/dispositivo-socket"

export const dispositivo = () => {
    socket.on('dispositivo:web', (e) => { dispositivoSocket(e) })
}