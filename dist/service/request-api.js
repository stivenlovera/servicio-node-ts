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
exports.CreateRequestFormData = exports.CreateRequest = void 0;
//import DigestClient from 'digest-fetch'
const urllib_1 = __importDefault(require("urllib"));
const form_data_1 = __importDefault(require("form-data"));
const digest_fetch_1 = __importDefault(require("digest-fetch"));
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("node:fs/promises");
function CreateRequest({ host, password, url, usuario, method, data, files, contentType }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
        console.log(`body`, data);
        try {
            const response = yield urllib_1.default.request(`http://${host}/${url}`, {
                method: method,
                contentType: contentType,
                dataType: 'json',
                headers: {},
                digestAuth: `${usuario}:${password}`,
                data: data,
                files: files
            });
            //console.log('api', response.status)
            return {
                status: response.status,
                message: response.statusText,
                data: response.data
            };
        }
        catch (error) {
            //console.log('api error', error)
            return {
                status: 301,
                message: 'se encontro un error',
                data: null
            };
        }
    });
}
exports.CreateRequest = CreateRequest;
function CreateRequestFormData({ host, password, url, usuario, method, data, files, contentType }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
        const httpAgent = new node_http_1.default.Agent({
            keepAlive: true,
            maxSockets: 10,
            timeout: 10000,
            autoSelectFamilyAttemptTimeout: 10000,
            keepAliveInitialDelay: 10000,
            maxFreeSockets: 100,
            maxTotalSockets: 100,
        });
        const httpsAgent = new node_https_1.default.Agent({
            keepAlive: true,
            maxSockets: 10,
            /* maxKeepAliveRequests: 0,
            maxKeepAliveTime: 240000 */
        });
        const agentSelector = function (_parsedURL) {
            /* if (_parsedURL.protocol == 'http:') {
                return httpAgent;
            } else {
                return httpsAgent;
            } */
            return httpAgent;
        };
        try {
            const formData = new form_data_1.default();
            const absolutePath = path_1.default.join(__dirname, '../' + '../' + 'nueva_imagen.jpeg');
            const absoluteText = path_1.default.join(__dirname, '../' + '../' + 'text.txt');
            console.log('ruta imagen', absolutePath);
            const blob = new Blob([yield (0, promises_1.readFile)(absolutePath)], { type: "image/jpeg" });
            const blobText = new Blob([yield (0, promises_1.readFile)(absoluteText)], { type: "text/plain" });
            let imagen = fs.readFileSync(absolutePath);
            formData.append('FaceDataRecord', JSON.stringify({ faceLibType: "blackFD", FDID: "1", FPID: "15" }));
            formData.append('Img', imagen, {
                contentType: 'text/plain',
                filepath: absolutePath,
                filename: 'nueva_imagen.jpeg',
            });
            console.log('data', formData);
            console.log('header', formData.getBoundary());
            /*  const ContentLength = formData.getLengthSync();
             console.log('ContentLength', ContentLength) */
            const client = new digest_fetch_1.default(usuario, password, { algorithm: 'MD5' });
            const response = yield client.fetch(`http://localhost:3300/anime/portada`, //http://localhost:3300/anime/portada
            {
                method: 'PUT',
                contentType: 'multipart/form-data',
                redirect: "follow",
                body: formData,
                follow: 20, // maximum redirect count. 0 to not follow redirect
                compress: true, // support gzip/deflate content encoding. false to disable
                /* headers: {
                    //'Transfer-Encoding': 'gzip',
                    'Content-type': `multipart/form-data; boundary=${formData.getHeaders()}`,
                    'Accept-Encoding': 'gzip, deflate, br',
                    //'Content-Length': ContentLength
                }, */
                headers: {
                /* acceptEncoding: "gzip, deflate, br",
                connections: "keep-alive",
                contentLength: 17818 */
                },
                agent: agentSelector
            });
            console.log("STATUS:", response.status, "\nCONTENT TYPE:", response.headers.get("content-type"));
            console.log("RAW BODY:", yield response.text());
            return {
                status: response.status,
                message: response.statusText,
                data: 'response.data'
            };
        }
        catch (error) {
            console.log('api error', error);
            return {
                status: 301,
                message: 'se encontro un error',
                data: null
            };
        }
    });
}
exports.CreateRequestFormData = CreateRequestFormData;
