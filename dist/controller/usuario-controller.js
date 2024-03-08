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
const servicio_1 = require("../service/servicio");
const usuarioController = (inscripciones, lectores) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('procensando datos', inscripciones, lectores);
    lectores.map((lector) => __awaiter(void 0, void 0, void 0, function* () {
        inscripciones.map((inscripcion) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('verificando data', inscripcion);
            const response = yield (0, servicio_1.CreateRequest)({
                host: lector.ipLector,
                method: 'POST',
                password: lector.passLector,
                usuario: lector.userLector,
                url: 'ISAPI/AccessControl/UserInfo/Record?format=json',
                data: inscripcion
            });
            console.log('respuesta de la api', response);
        }));
    }));
});
exports.default = usuarioController;
