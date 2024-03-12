import { CronJob } from "cron";
import { InitializeLoggers } from "./config/logguers";
import { InitializeSocket } from "./config/socket-io";
import { dispositivo } from "./emisores/dispositivo";
import { usuario, usuarioFoto } from "./emisores/usuario";
import urllib, { Dispatcher } from 'urllib';

urllib.USER_AGENT='app/1.0'

export const logger = InitializeLoggers();
logger.info('Iniziando Servicio ...');
export const socket = InitializeSocket();

/*MODULOS SOCKETS */
dispositivo();
usuario();
const Cron = CronJob.from({
    cronTime: '*/30 * * * * *',
    onTick: function () {
        console.log('Cron Job reinciando')
        logger.info('Cron Job reinciando');
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});

Cron.start();



