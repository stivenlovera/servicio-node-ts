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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestFormData = exports.CreateRequest = void 0;
const digest_fetch_1 = __importDefault(require("digest-fetch"));
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("node:fs/promises");
function CreateRequest({ host, password, url, usuario, method, data, files, contentType }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
        const httpAgent = new node_http_1.default.Agent({ keepAlive: true });
        const httpsAgent = new node_https_1.default.Agent({ keepAlive: true });
        const agentSelector = function (_parsedURL) {
            if (_parsedURL.protocol == 'http:') {
                return httpAgent;
            }
            else {
                return httpsAgent;
            }
        };
        try {
            console.log('cuerpo', data);
            const client = new digest_fetch_1.default(usuario, password, { algorithm: 'MD5' });
            const response = yield client.fetch(`http://${host}/${url}`, {
                method: method,
                contentType: contentType,
                body: JSON.stringify(data),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Connection": "Keep-Alive",
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept': '/*/',
                    //"X-Content-Type-Options": 'nosniff',
                    //'Content-Type': 'multipart/form-data',
                    //'Content-length': '5000',
                    //'Connection': 'max'
                },
                agent: agentSelector
                //headers: {},
            });
            response;
            //console.log('try', data, files)
            /* const authorization = `Digest "${usuario}:"${password}"`;
            const response = await axios.get(`http://${host}/${url}`, {
                method: method,
                timeout: 500000,
                //dataType: 'json',
                headers: {
                    'WWW-Authenticate': 'Digest',
                    Authorization: authorization
                },
                data: data,
        
            }); */
            /*  const digestAuth = new AxiosDigestAuth({
                 username: usuario,
                 password: password,
             });
        
             const response = await digestAuth.request({
                 headers: {
                     'Content-Type': 'application/json',
                     'WWW-Authenticate': 'Digest',
                     Connection: 'keep-alive',
                     Accept: 'application/json',
                 },
                 method: 'POST',
                 url: `http://${host}/${url}`,
                 data: data,
             }); */
            //urllib.USER_AGENT = 'PostmanRuntime/7.36.3'
            /* const mockAgent = new MockAgent();
            setGlobalDispatcher(mockAgent);
    
            const mockPool = mockAgent.get('http://localhost:7001');
    
            mockPool.intercept({
                path: '/foo',
                method: 'POST',
                headers: {
    
                }
            }).reply(400, {
                message: 'mock 400 bad request',
            });
    
            const response = await request(`http://${host}:80/${url}`, {
                method: method,
                contentType: contentType,
                timeout: [10000, 15000],
                dataType: 'json',
                headers: {
                    //'Content-Type': 'multipart/form-data;',
                    //'Content-Length': '3555444566',
                    //'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept': '*',
                    //'Cache-Control':'no-cache',
                    'Connection': 'keep-alive',
                    //'Keep-Alive:': 'timeout=5',
                    'X-Frame-Options': 'SAMEORIGIN',
                    'X-Content-Type-Options': 'nosniff',
                    'Content-Type': 'multipart/form-data',
                    'Host': '192.168.1.246',
                    'Content-length': '5000',
                    //'Transfer-Encoding': 'chunked'
                },
    
                digestAuth: `${usuario}:${password}`,
                //timing:true,
                data: data,
                files: files
            });
    
            console.log(response)
            assert.equal(response.status, 400); */
            /* const response = await urllib.request(`http://${host}:80/${url}`, {
                method: method,
                contentType: contentType,
                timeout: [10000, 15000],
                dataType: 'json',
                headers: {
                    //'Content-Type': 'multipart/form-data;',
                    //'Content-Length': '3555444566',
                    //'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept': '*',
                    //'Cache-Control':'no-cache',
                    'Connection': 'keep-alive',
                    //'Keep-Alive:': 'timeout=5',
                    'X-Frame-Options': 'SAMEORIGIN',
                    'X-Content-Type-Options': 'nosniff',
                    'Content-Type': 'multipart/form-data',
                    'Host': '192.168.1.246',
                    'Content-length': '5000',
                    //'Transfer-Encoding': 'chunked'
                },
    
                digestAuth: `${usuario}:${password}`,
                //timing:true,
                data: data,
                files: files
            }); */
            console.log('api respuesta', response);
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
exports.CreateRequest = CreateRequest;
function CreateRequestFormData({ host, password, url, usuario, method, data, files, contentType }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
        const httpAgent = new node_http_1.default.Agent({ keepAlive: true });
        const httpsAgent = new node_https_1.default.Agent({ keepAlive: true });
        const agentSelector = function (_parsedURL) {
            if (_parsedURL.protocol == 'http:') {
                return httpAgent;
            }
            else {
                return httpsAgent;
            }
        };
        try {
            const formData = new FormData();
            const absolutePath = path_1.default.join(__dirname, '../' + '../' + 'nueva_imagen.jpg');
            const absoluteText = path_1.default.join(__dirname, '../' + '../' + 'text.txt');
            console.log('ruta imagen', absolutePath);
            const blob = new Blob([yield (0, promises_1.readFile)(absolutePath)], { type: "image/jpg" });
            const blobText = new Blob([yield (0, promises_1.readFile)(absoluteText)], { type: "text/plain" });
            /* formData.set('FaceDataRecord', new Blob([JSON.stringify({
                FaceDataRecord: { faceLibType: "blackFD", FDID: "1", FPID: "15" }
            })])); */
            formData.append('FaceDataRecord', JSON.stringify({ "faceLibType": "blackFD", "FDID": "1", "FPID": "15" }));
            formData.append('Img', blob, 'nueva_imagen.jpg');
            /* formData.set('FaceDataRecord',new Blob([JSON.stringify({"faceLibType":"blackFD","FDID":"1","FPID":"15"})], {
                type: "application/json"
            })) */
            console.log('cuerpo formData', formData.values());
            for (const value of formData.values()) {
                console.log(value);
            }
            const client = new digest_fetch_1.default(usuario, password, { algorithm: 'MD5' });
            const response = yield client.fetch(`http://${host}/${url}`, {
                method: method,
                contentType: false,
                mimeType: 'multipart/form-data',
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    //'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate',
                    //"Content-Type": "multipart/form-data; boundary=------border",
                    "Connection": " keep-alive",
                    'Accept': 'application/json',
                    'Content-Type': undefined
                    //"Content-Type": "multipart/form-data"
                    /* 'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "Connection": "Keep-Alive",
                    
                   , */
                },
                //agent: agentSelector
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
