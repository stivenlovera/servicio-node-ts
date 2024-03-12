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
exports.dispositivoController = void 0;
const __1 = require("..");
const request_api_1 = require("../service/request-api");
const dispositivoController = (lector) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, request_api_1.CreateRequest)({
        contentType: "application/json",
        host: lector.ipLector,
        method: 'GET',
        password: lector.passLector,
        usuario: lector.userLector,
        url: 'ISAPI/System/deviceinfo'
    });
    //const data = convertXML(response.data.toString())
    //respuesta
    __1.socket.emit('dispositivo:service', 'data');
});
exports.dispositivoController = dispositivoController;
exports.default = exports.dispositivoController;
