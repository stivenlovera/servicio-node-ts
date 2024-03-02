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
exports.MakeARequest = void 0;
const simple_xml_to_json_1 = require("simple-xml-to-json");
const urllib_1 = __importDefault(require("urllib"));
function MakeARequest() {
    return __awaiter(this, void 0, void 0, function* () {
        let authorizationUser = 'admin';
        let authorizationPassword = 'molomix654';
        const data = yield urllib_1.default.request('http://192.168.88.30/ISAPI/System/deviceinfo', {
            method: 'GET',
            contentType: 'application/json',
            headers: {},
            digestAuth: `${authorizationUser}:${authorizationPassword}`
        });
        console.log("🚀 ~ file: test.mjs:26 ~ data:", data.data.toString());
        const Json = (0, simple_xml_to_json_1.convertXML)(data.data.toString());
        console.log(Json.DeviceInfo.children);
        console.log("🚀 ~ file: test.mjs:26 ~ data:", data.status.toString());
        return Json.DeviceInfo.children;
    });
}
exports.MakeARequest = MakeARequest;
