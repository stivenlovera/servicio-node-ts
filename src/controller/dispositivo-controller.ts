
import { convertXML } from "simple-xml-to-json"
import { socket } from ".."
import { Ilector } from "../interface/hikvision/dipositivo"
import { CreateRequest } from "../service/request-api"

export const dispositivoController = async (lector: Ilector) => {
    const response = await CreateRequest({
        contentType: "application/json",
        host: lector.ipLector,
        method: 'GET',
        password: lector.passLector,
        usuario: lector.userLector,
        url: 'ISAPI/System/deviceinfo'
    });
    //const data = convertXML(response.data.toString())

    //respuesta
    socket.emit('dispositivo:service', 'data')
}

export default dispositivoController