import axios from '../../config/axios/axiosBlog';
import Logger from '../../loggingUtil/logger';
import * as ACTIONS from './types';
import ErrorDTO from '../../dto/ErrorDTO';
import _ from 'lodash';

const logger = Logger('messageActions');

const delay = ms => new Promise(_ => setTimeout(_, ms));



export const hideMessage = () => {

    return { type: ACTIONS.HIDE_MESSAGE };
}

export const clearMessage = () => dispatch => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
}

export const processStart =(successPayload={})=>async dispatch=>{

    //const dispathObject = {...successPayload};
    if (!_.isEmpty(successPayload)){
        dispatch(successPayload);
    }
   
    dispatch(clearMessage());


}

export const processSuccess =(successPayload={},message='success')=>async dispatch=>{

    //const dispathObject = {...successPayload};
    dispatch(successPayload);
    dispatch(processMessage(message));


}

export const processError = (error) => async dispatch => {
    dispatch(getErrorAction(error));
    // await delay(5000);
    //  dispatch(hideMessage())
}

export const processMessage=(message='default success')=> async dispatch=>{
dispatch({type:ACTIONS.CREATE_MESSAGE , payload:message});
}

const getErrorDTO = (error) => {
    let errorPayload;
    let errorDTO

    if (!!error.response && !!error.response.data) {
        errorDTO = error.response.data;
        logger.log('getErrorDTO -errorDTO.message', errorDTO.message);
    }
    if (!!errorDTO && !!errorDTO.createTime) {

        errorDTO = new ErrorDTO(errorDTO.type, errorDTO.message, errorDTO.method, errorDTO.detailErrorObject);
        errorDTO.setTitle('User Error!');
        // call toJSON() to object is returned with its properties
        return errorDTO.toJSON();
    }

    errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM,
        'Cannot complete your action at this time. Contact support! '+error, '[messageAction]:getErrorDTO', error);
    errorDTO.setTitle('System Error!');
    
    return errorDTO.toJSON();
}

 const getErrorAction = (error) => {
    let errorDTO = getErrorDTO(error)
    return { type: ACTIONS.CREATE_ERROR_MESSAGE, payload: errorDTO };
}

/* export const createMessage = (error) =>  {
    let errorPayload;
    let errorDTO 
    if (!!error.response && !!error.response.data){
       errorDTO = error.response.data;
    }

    if (!!errorDTO && !!errorDTO.createTime) {
        errorPayload = {
            detailErrorObject: errorDTO.detailErrorObject,
            type: errorDTO.type,
            title:errorDTO.title,
            message: errorDTO.message
        }
        logger.error('createMessage errorPayload',errorPayload);

    } else {
        errorPayload = {
            detailErrorObject: null,
            type: 'SYSTEM',
            title:'System Error!',
            message: 'Cannot complete your action at this time. Contact support!'
        }
        logger.error('createMessage errorPayload',errorPayload);
    }

    return{ type: ACTIONS.CREATE_MESSAGE, payload: errorPayload };
} */

