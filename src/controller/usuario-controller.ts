
import { logger, socket } from ".."
import { ILectorData, Ilector } from "../interface/hikvision/dipositivo"
import { IUsuarioFoto } from "../interface/hikvision/usuario"
import { CreateRequest, CreateRequestFormData } from "../service/request-api"
import { CreateRequestWeb } from "../service/request-api-web"


export const usuarioInsert = async (lectorData: ILectorData<IUsuarioFoto>[]) => {
    lectorData.map(async (lector, i) => {
        const response_usuario = await CreateRequest({
            contentType: "application/json",
            host: lector.ipLector,
            method: 'POST',
            password: lector.passLector,
            usuario: lector.userLector,
            url: 'ISAPI/AccessControl/UserInfo/Record?format=json',
            data: {
                UserInfo: lector.data.UserInfo
            }
        });
        console.log('response_foto', response_usuario)
        logger.info(`insertando usuario => ${response_usuario}`);

        //lector.data.FaceDataRecord.faceURL = 'https://gym-admin.todo-soft.net/imagenes/clientes/image65ec314fd83471709977935.jpg';
        //
        const response_foto = await CreateRequest({
            contentType: "application/json",
            host: lector.ipLector,
            method: 'PUT',
            password: lector.passLector,
            usuario: lector.userLector,
            url: 'ISAPI/Intelligent/FDLib/FDSetUp?format=json',
            data: lector.data.FaceDataRecord
        });
        console.log('response_foto', response_foto)
        logger.info(`insertando usuario => ${response_foto}`);
    });
}
async function procesamientoImagen(img: string) {
    const response = await CreateRequestWeb({
        contentType: "multipart/form-data",
        method: 'GET',
        url: img
    })
    console.log(response)
}
