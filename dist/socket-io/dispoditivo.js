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
const simple_xml_to_json_1 = require("simple-xml-to-json");
const __1 = require("..");
const servicio_1 = require("../service/servicio");
const dispoditivoSocket = (lector) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, servicio_1.CreateRequest)({
        host: lector.ipLector,
        method: 'GET',
        password: lector.passLector,
        usuario: lector.userLector,
        url: 'ISAPI/System/deviceinfo'
    });
    const data = (0, simple_xml_to_json_1.convertXML)(response.data.toString());
    console.log(data.DeviceInfo.children);
    //socket.emit('dispotivo:show', { dasda: 'esto viene desde el servicio' })
    __1.socket.emit('dispositivo:service', data);
    //console.log('emitiendo: dispotivo:show', { dasda: 'esto viene desde el servicio' })
});
exports.default = dispoditivoSocket;
