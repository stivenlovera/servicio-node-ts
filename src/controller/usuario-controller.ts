
import { convertXML } from "simple-xml-to-json"
import { logger, socket } from ".."
import { Ilector } from "../interface/hikvision/dipositivo"
import { CreateRequest, CreateRequestFormData } from "../service/request-api"
import { IUsuario } from "../interface/hikvision/usuario"
import { IImagen } from "../interface/hikvision/foto"
import { CreateRequestWeb } from "../service/request-api-web"
import * as fs from 'fs';
import path from "path"

export const usuarioInsert = async (usuarios: IUsuario[], lectores: Ilector[], fotos: IImagen[]) => {
    lectores.map(async (lector, i) => {
        if (i == 0) {
            usuarios.map(async (usuario) => {
               /*  const response = await CreateRequest({
                    contentType: "application/json",
                    host: lector.ipLector,
                    method: 'POST',
                    password: lector.passLector,
                    usuario: lector.userLector,
                    url: 'ISAPI/AccessControl/UserInfo/Record?format=json',
                    data: usuario
                });
                console.log(response)
                logger.info(`insertando usuario => ${response}`); */
            });

            fotos.map(async (foto) => {
                const { data, message, status } = await CreateRequestWeb({ url: foto.img.toString(), method: 'GET', contentType: "application/json" })
                //const image = new Buffer.from(data, data.legnt);
                let str = Buffer.from(data).toString();
                //const blob = new Blob([str], { type: 'imagen/jpeg' });
                //const file = new File([blob], "mi foto.jpeg");
                //const imagen = await fs.writeFileSync('nueva_imagen.jpg', data, { encoding: "binary" });
                const absolutePath = path.join(__dirname, '../' + '../' + 'nueva_imagen.jpeg');
                //const absolutePath = path.join(__dirname + '/nueva_imagen.jpeg');
                console.log('absolutePath', absolutePath)

                const imagen = fs.createReadStream(absolutePath);
                //console.log('File extraido -------', imagen)

                //foto.img = imagen;
                //console.log('File -------', imagen)
                const response = await CreateRequestFormData({
                    contentType: "application/json",
                    host: lector.ipLector,
                    method: 'PUT',
                    password: lector.passLector,
                    usuario: lector.userLector,
                    url: 'ISAPI/Intelligent/FDLib/FDSetUp?format=json',
                    files: [imagen],
                    data: { FaceDataRecord: foto.FaceDataRecord, img: 'imagen' }
                });
                logger.info(`insertando foto => ${response}`);
            });
        }
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
