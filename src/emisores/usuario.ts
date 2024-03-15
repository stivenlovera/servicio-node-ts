import { logger, socket } from ".."
import { usuarioInsert } from "../controller/usuario-controller"
import { ILectorData, Ilector } from "../interface/hikvision/dipositivo"
import { IFaceDataRecord } from "../interface/hikvision/foto"
import { IUsuarioFoto } from "../interface/hikvision/usuario"

export const usuario = () => {
    socket.on('store:usuario:service', async (ILectorData: ILectorData<IUsuarioFoto>[]) => {
        logger.info('SOCKET RECIBIENDO CANAL => store:usuario:web');
        console.log('recibiendo data', ILectorData)
        await usuarioInsert(ILectorData)
        //validate imagen
    });

    socket.on('get:usuario:service', (ILectorData: ILectorData<IUsuarioFoto>[]) => {
        logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });

    socket.on('update:usuario:service', (ILectorData: ILectorData<IUsuarioFoto>[]) => {
        logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });

    socket.on('delete:usuario:service', (ILectorData: ILectorData<IUsuarioFoto>[]) => {
        logger.info('SOCKET RECIBIENDO CANAL => nuevo:usuario:service');
        /* console.log('recibiendo data', usuarios, lectores, fotos)
        usuarioInsert(usuarios, lectores, fotos) */
        //validate imagen
    });
}