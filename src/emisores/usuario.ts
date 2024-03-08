import { socket } from ".."
import usuarioController from "../controller/usuario-controller"
import { Ilector } from "../interface/hikvision/dipositivo"
import { IUsuario } from "../interface/hikvision/usuario"

interface usuarioProps {
    usuarios: IUsuario[]
    lectores: Ilector[]
}
export const usuario = () => {
    socket.on('nuevo:usuario:service', ({ usuarios, lectores }: usuarioProps) => {
        console.log('te escuche', 'nuevo:usuario:service')
        usuarioController(usuarios, lectores)
    })
}