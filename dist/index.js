"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = exports.logger = void 0;
const cron_1 = require("cron");
const logguers_1 = require("./config/logguers");
const socket_io_1 = require("./config/socket-io");
const dispositivo_1 = require("./emisores/dispositivo");
const usuario_1 = require("./emisores/usuario");
const urllib_1 = __importDefault(require("urllib"));
urllib_1.default.USER_AGENT = 'app/1.0';
exports.logger = (0, logguers_1.InitializeLoggers)();
exports.logger.info('Iniziando Servicio ...');
exports.socket = (0, socket_io_1.InitializeSocket)();
/*MODULOS SOCKETS */
(0, dispositivo_1.dispositivo)();
(0, usuario_1.usuario)();
const Cron = cron_1.CronJob.from({
    cronTime: '*/30 * * * * *',
    onTick: function () {
        console.log('Cron Job reinciando');
        exports.logger.info('Cron Job reinciando');
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});
Cron.start();
