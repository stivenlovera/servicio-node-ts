import { logger, socket } from ".."
import { usuarioInsert } from "../controller/usuario-controller"
import { Ilector } from "../interface/hikvision/dipositivo"
import { IImagen } from "../interface/hikvision/foto"
import { IUsuario } from "../interface/hikvision/usuario"

interface usuarioProps {
    usuarios: IUsuario[]
    lectores: Ilector[]
    fotos: IImagen[]
}
export const usuario = () => {
    socket.on('nuevo:usuario:service', ({ usuarios, lectores, fotos }: usuarioProps) => {
        logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        console.log( 'recibiendo data', usuarios, lectores, fotos )
    
        usuarioInsert(usuarios, lectores, fotos)
        //validate imagen
    });
}

export const usuarioFoto = () => {

    socket.on('nuevo:usuario-foto:service', ({ usuarios, lectores }: usuarioProps) => {
        console.log('te escuche', 'nuevo:usuario-foto:service')

    })
}