

const { createLogger, format, transports,addColors } = require('winston');
const { combine, timestamp, label, printf } = format;

/*
check winston github to check the available colors and bacground
https://github.com/winstonjs/winston#formats
 */
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    colors: {
        error: 'bold red yellowBG', // red, bold and yellow bacground
        warn: "magenta",
        info: "blue",
        verbose: "green",
        debug: "green",
        silly: "gray"
    }
};

addColors(logLevels);

const logger1 = createLogger({
    format: combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.align(),
        format.printf((info) => {
            const {
                timestamp, level, message, ...args
            } = info;


            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    ),
    level:'silly',
    transports: [new transports.Console()]
});



const logger = (function (className1) {

    const className = className1.toUpperCase();

    const logger1 = createLogger({
        format: combine(
            format.colorize({ all: true }),
            format.timestamp(),
            format.align(),
            format.printf((info) => {
                const {
                    timestamp, level, message, ...args
                } = info;


                const ts = timestamp.slice(0, 19).replace('T', ' ');
                // without time stamp
                return `[${className}]: [${level}]: ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;

                // with timestamp
               // return `${ts} [${className}]: [${level}]: ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            }),
        ),
        level:'silly',
        transports: [new transports.Console()]
    });


    return logger1;

})

module.exports=logger;