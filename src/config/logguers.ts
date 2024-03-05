import winston from "winston";
import * as fs from 'fs';
import * as path from 'path';
import 'winston-daily-rotate-file';

export function InitializeLoggers() {
    var transport = new winston.transports.DailyRotateFile({
        dirname: 'logs/' + getDirName(),
        filename: 'log-%DATE%',
        datePattern: 'YYYY-MM-DD', // rotates every day
    });

    function getDirName() { // returns current YYYY-MM
        var curDate = new Date();
        var curMonth = ("0" + (curDate.getMonth() + 1)).slice(-2);
        var curYYYYMM = curDate.getFullYear() + "-" + curMonth;
        return curYYYYMM;
    }

    transport.on('rotate', function () {
        if (!fs.existsSync('logs/' + getDirName() + '/')) {
            transport = new winston.transports.DailyRotateFile({
                dirname: 'logs/' + getDirName(),
                filename: 'log-%DATE%' + '.log',
                datePattern: 'YYYY-MM-DD',

            });
        }
    });

    var logger = winston.createLogger({
        transports: [
            transport
        ]
    });
    return logger;
}
// Initialize the transport with the proper folder for the current month.

