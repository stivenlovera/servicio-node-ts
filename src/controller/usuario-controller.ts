
import { convertXML } from "simple-xml-to-json"
import { socket } from ".."
import { Ilector } from "../interface/hikvision/dipositivo"
import { CreateRequest } from "../service/servicio"
import { IUsuario } from "../interface/hikvision/usuario"

const usuarioController = async (inscripciones: IUsuario[], lectores: Ilector[]) => {
    console.log('procensando datos', inscripciones, lectores)
    lectores.map(async (lector) => {
        inscripciones.map(async (inscripcion) => {
            console.log('verificando data', inscripcion)
            const response = await CreateRequest({
                host: lector.ipLector,
                method: 'POST',
                password: lector.passLector,
                usuario: lector.userLector,
                url: 'ISAPI/AccessControl/UserInfo/Record?format=json',
                data: inscripcion
            });
            console.log('respuesta de la api', response)
        })

    });
}

export default usuarioController