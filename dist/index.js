"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = exports.logger = void 0;
const cron_1 = require("cron");
const logguers_1 = require("./config/logguers");
const socket_io_1 = require("./config/socket-io");
const dispositivo_1 = require("./emisores/dispositivo");
exports.logger = (0, logguers_1.InitializeLoggers)();
exports.logger.info('Iniziando Servicio ...');
exports.socket = (0, socket_io_1.InitializeSocket)();
/*MODULOS SOCKETS */
(0, dispositivo_1.dispositivo)();
const Cron = cron_1.CronJob.from({
    cronTime: '*/10 * * * * *',
    onTick: function () {
        console.log('Cron Job reinciando');
        exports.logger.info('Cron Job reinciando');
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});
Cron.start();
