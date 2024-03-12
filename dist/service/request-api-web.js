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
exports.CreateRequestWeb = void 0;
const urllib_1 = __importDefault(require("urllib"));
function CreateRequestWeb({ url, method, data, contentType }) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(`web request => ${process.env.URL_WEB}/${url}`)
        try {
            const response = yield urllib_1.default.request(`${process.env.URL_WEB}/${url}/`, {
                method: method,
                contentType: contentType,
                dataType: 'buffer',
                headers: {},
                data: data,
            });
            //console.log(`web response => ${response.statusCode, response.data}`)
            return {
                status: response.statusCode,
                message: response.statusText,
                data: response.data
            };
        }
        catch (error) {
            //console.log(`web response => ${error}`)
            return {
                status: '500',
                message: 'error',
                data: 'error'
            };
        }
    });
}
exports.CreateRequestWeb = CreateRequestWeb;
