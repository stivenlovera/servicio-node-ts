"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioInsert = void 0;
const __1 = require("..");
const request_api_1 = require("../service/request-api");
const request_api_web_1 = require("../service/request-api-web");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const usuarioInsert = (usuarios, lectores, fotos) => __awaiter(void 0, void 0, void 0, function* () {
    lectores.map((lector, i) => __awaiter(void 0, void 0, void 0, function* () {
        if (i == 1) {
            usuarios.map((usuario) => __awaiter(void 0, void 0, void 0, function* () {
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
            }));
            fotos.map((foto) => __awaiter(void 0, void 0, void 0, function* () {
                const { data, message, status } = yield (0, request_api_web_1.CreateRequestWeb)({ url: foto.img.toString(), method: 'GET', contentType: "application/json" });
                //const image = new Buffer.from(data, data.legnt);
                let str = Buffer.from(data).toString();
                //const blob = new Blob([str], { type: 'imagen/jpg' });
                //const file = new File([blob], "mi foto.jpg");
                //const imagen = await fs.writeFileSync('nueva_imagen.jpg', data, { encoding: "binary" });
                const absolutePath = path_1.default.join(__dirname, '../' + '../' + 'nueva_imagen.jpg');
                //const absolutePath = path.join(__dirname + '/nueva_imagen.jpg');
                console.log('absolutePath', absolutePath);
                const imagen = fs.createReadStream(absolutePath);
                //console.log('File extraido -------', imagen)
                //foto.img = imagen;
                //console.log('File -------', imagen)
                const response = yield (0, request_api_1.CreateRequestFormData)({
                    contentType: "application/json",
                    host: lector.ipLector,
                    method: 'PUT',
                    password: lector.passLector,
                    usuario: lector.userLector,
                    url: 'ISAPI/Intelligent/FDLib/FDSetUp?format=json',
                    files: [imagen],
                    data: { FaceDataRecord: foto.FaceDataRecord, img: 'imagen' }
                });
                __1.logger.info(`insertando foto => ${response}`);
            }));
        }
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
