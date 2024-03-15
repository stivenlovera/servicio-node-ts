"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioInsert = void 0;
const __1 = require("..");
const request_api_1 = require("../service/request-api");
const request_api_web_1 = require("../service/request-api-web");
const usuarioInsert = (lectorData) => __awaiter(void 0, void 0, void 0, function* () {
    lectorData.map((lector, i) => __awaiter(void 0, void 0, void 0, function* () {
        const response_usuario = yield (0, request_api_1.CreateRequest)({
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
        console.log('response_foto', response_usuario);
        __1.logger.info(`insertando usuario => ${response_usuario}`);
        //lector.data.FaceDataRecord.faceURL = 'https://gym-admin.todo-soft.net/imagenes/clientes/image65ec314fd83471709977935.jpg';
        //
        const response_foto = yield (0, request_api_1.CreateRequest)({
            contentType: "application/json",
            host: lector.ipLector,
            method: 'PUT',
            password: lector.passLector,
            usuario: lector.userLector,
            url: 'ISAPI/Intelligent/FDLib/FDSetUp?format=json',
            data: lector.data.FaceDataRecord
        });
        console.log('response_foto', response_foto);
        __1.logger.info(`insertando usuario => ${response_foto}`);
    }));
});
exports.usuarioInsert = usuarioInsert;
function procesamientoImagen(img) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, request_api_web_1.CreateRequestWeb)({
            contentType: "multipart/form-data",
            method: 'GET',
            url: img
        });
        console.log(response);
    });
}
