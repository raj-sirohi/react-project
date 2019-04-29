import axios from 'axios';
import Logger from '../../loggingUtil/logger';

const logger = Logger('axiosGlobal');

// global default are passed to the axios instance
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['GLOBAL_AUTH_HEADER'] = 'dummy token';
axios.defaults.timeout=5000; // set default timeout of 5 secs

// this is by default
//axios.defaults.headers.post['Content-Type'] = 'application/json';


// global interceptor will not fire if instance of axios is used
// so it better to define interceptor on instance
// following will not fire
axios.interceptors.request.use(request => {
    logger.log('axios global interceptor for request',request);
    // Edit request config
    return request;
}, error => {
    logger.error('Error -axios global interceptor for request',error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    logger.log('axios global interceptor for response',response);
    // Edit request config
    return response;
}, error => {
    logger.error('Error -axios global interceptor for response',error);
    return Promise.reject(error);
});

export default axios;