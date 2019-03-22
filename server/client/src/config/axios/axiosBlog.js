import axios from './axiosGlobal';
import Logger from '../../loggingUtil/logger';
import ErrorDTO from '../../dto/ErrorDTO';

const logger = Logger('axiosBlog');

const instance = axios.create({
   // baseURL: 'https://jsonplaceholder.typicode.com' // if will be taken from global default
  // headers: {'BLOG_INSTANCE_HEADER': 'dummy blog token'}
});

// can also define additional headers for this instance in addition to global headers
// for example when axios blog is used following request header will be set
instance.defaults.headers.common['Authorization111'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use(request => {
   // logger.log('instance interceptor for request',request);
    // Edit request config
    return request;
}, error => {
    
    const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.AXIOS,'not able to connect to server','axiosBlog-intercepter',error);
    logger.error('instance.interceptors.request- error',error);
    logger.error('instance.interceptors.request- errorDTO',errorDTO);
    return Promise.reject(errorDTO);
});

// error contains response object and it contains the errorDTO from server.
// if database is down then response is undefined in error,
// and error contains message:"timeout of 5000ms exceeded"
instance.interceptors.response.use(null, error => {
    // const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.AXIOS,'not able to connect to server','axiosBlog-intercepter',error);
     logger.error('instance.interceptors.response - error',error);
     //logger.error('instance.interceptors.response - error.response.data',error.response.data); // this will display errorDTO from server
    // logger.error('instance.interceptors.response -  errorDTO',errorDTO); // this will display errorDTO as an object
    // logger.error('instance.interceptors.response - errorDTO.toJSON()',errorDTO.toJSON()); // this will display errorDTO with values from server
    // logger.error('instance.interceptors.response - errorDTO.toJSON().detailErrorObject',errorDTO.toJSON().detailErrorObject.response);
   
    return Promise.reject(error);
});


export default instance;