const Logger = require('./winston');

const nestedObj = {
    foo: {
        bar: {
            baz: "example"
        }
    }
};

logger = Logger('test')

logger.error('this is error message',nestedObj);

logger.warn('this is warn message')

logger.info('this is info message',nestedObj);

logger.debug('this is debug message',nestedObj)
