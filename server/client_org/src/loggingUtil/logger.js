import loggerConfig from './loggerConfig'
import Moment from 'moment';



const printLogMessage = (logType, className, ...args) => {

    const txtColor = loggerConfig.getLoggerConfig(logType).TXT_COLOR;
    const displayTime = loggerConfig.getLoggerConfig(logType).DISPLAY_TIME;

    let consoleMsg = null;

    let arg1 = null;
    let arg2 = null;

    if (args.length > 0) {
        arg1 = args[0];

        if (args.length > 1) {
            arg2 = args[1];
        }

        if (args.length == 1) {

            if (typeof arg1 === 'string') {
                consoleMsg = displayTime ? `%c${logType}:[${Moment().format('DD/MM/YYYY h:mm:ss a')}]:[${className}]: ${arg1}` : `%c${logType}:[${className}]:${arg1}`;
                console.log(consoleMsg, `color: ${txtColor};`);

            } else {
                consoleMsg = displayTime ? `%c${logType}:[${Moment().format('DD/MM/YYYY h:mm:ss a')}]:[${className}]: %o` : `%c${logType}:[${className}]:%o`;
                console.log(consoleMsg, `color: ${txtColor};`, arg1);
            }

        } else {
            consoleMsg = displayTime ? `%c${logType}:[${Moment().format('DD/MM/YYYY h:mm:ss a')}]:[${className}]:${arg1}:%o` : `%c${logType}:[${className}]:${arg1}:%o`;
            console.log(consoleMsg, `color: ${txtColor};`, arg2);
        }
    }

}

const logger = (function (className1) {

    const className = className1;
    const level = loggerConfig.getLoggerLevel();

    return {

        debug: function (...args) {

            const debugLevel = loggerConfig.getLoggerConfig('DEBUG').LEVEL;


            if (debugLevel > level) {
                printLogMessage('DEBUG', className, ...args);
            }
        },

        log: function (...args) {

            const infoLevel = loggerConfig.getLoggerConfig('INFO').LEVEL;

            if (infoLevel > level) {
                printLogMessage('INFO', className, ...args);
            }
        },

        warn: function (...args) {

            const warnLevel = loggerConfig.getLoggerConfig('WARN').LEVEL;

            if (warnLevel > level) {
                printLogMessage('WARN', className, ...args);
            }
        },

        error: function (...args) {

            const errorLevel = loggerConfig.getLoggerConfig('ERROR').LEVEL;

            if (errorLevel > level) {
                printLogMessage('ERROR', className, ...args);
            }
        }
    }

})

export default logger;


