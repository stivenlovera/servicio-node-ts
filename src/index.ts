import { CronJob } from "cron";
import { InitializeLoggers } from "./config/logguers";
import { InitializeSocket } from "./config/socket-io";
import { dispositivo } from "./emisores/dispositivo";
import { usuario } from "./emisores/usuario";

export const logger = InitializeLoggers();
logger.info('Iniziando Servicio ...');
export const socket = InitializeSocket();

/*MODULOS SOCKETS */
dispositivo();
usuario();

const Cron = CronJob.from({
    cronTime: '*/10 * * * * *',
    onTick: function () {
        console.log('Cron Job reinciando')
        logger.info('Cron Job reinciando');
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});

Cron.start();



