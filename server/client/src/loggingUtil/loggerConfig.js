const CONFIG = (function () {

    const LOGGER_CONFIG = {
        DEBUG: {LEVEL: 1, TXT_COLOR: 'green', DISPLAY_TIME: false},
        INFO: {LEVEL: 3, TXT_COLOR: 'blue', DISPLAY_TIME: false},
        WARN: {LEVEL: 5, TXT_COLOR: 'deeppink', DISPLAY_TIME: false},
        ERROR: {LEVEL: 7, TXT_COLOR: 'red', DISPLAY_TIME: false}
    }

    /* set the logger level here, valid values:0,3, and 5. Higher then 5 no logging */
    const LOGGER_LEVEL = {
        LEVEL: 0
    }

    return {
        getLoggerLevel: function () {
            return LOGGER_LEVEL.LEVEL;
        },
        getLoggerConfig: function (name) {
            return LOGGER_CONFIG[name];
        }
    };
})();

export default CONFIG;