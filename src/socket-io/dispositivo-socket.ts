
import { convertXML } from "simple-xml-to-json"
import { socket } from ".."
import { Ilector } from "../interface/dipositivo"
import { CreateRequest } from "../service/servicio"

const dispositivoSocket = async (lector: Ilector) => {
    const response = await CreateRequest({
        host: lector.ipLector,
        method: 'GET',
        password: lector.passLector,
        usuario: lector.userLector,
        url: 'ISAPI/System/deviceinfo'
    });
    const data = convertXML(response.data.toString())
    socket.emit('dispositivo:service', data)
}
export default dispositivoSocket