
import errorDTO from '../../dto/ErrorDTO';
import ErrorDTO from '../../dto/ErrorDTO';
import Logger from '../../loggingUtil/logger';

const logger = Logger('errorUtils');

export const getApplicationErrorDTO = (error) =>  {
    let errorPayload;
    let errorDTO 
    logger.log('getApplicationErrorDTO AAAA');
    if (!!error.response && !!error.response.data){

        logger.log('getApplicationErrorDTO bbbb');
       errorDTO = error.response.data;
    }

    if (!!errorDTO && !!errorDTO.createTime && errorDTO.type!='SYSTEM') {
        logger.log('getApplicationErrorDTO CCCCC');
       return errorDTO

    } 
    logger.log('getApplicationErrorDTO DDDD error',error);
    errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM,
        'Cannot complete your action at this time. Contact support!','errorUtil', error);
        logger.log('getApplicationErrorDTO eeee errorDTO',errorDTO.toJSON());
   return errorDTO;

    
}