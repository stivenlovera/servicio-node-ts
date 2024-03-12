import { socket } from ".."
import dispositivoController from "../controller/dispositivo-controller"

export const dispositivo = () => {
    socket.on('dispositivo:web', (e) => { dispositivoController(e) })
}