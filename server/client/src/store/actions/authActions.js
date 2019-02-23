//import axios from 'axios';
import axios from '../../config/axios/axiosBlog'   //'../config/axios/axiosBlog';
import * as ACTIONS from './types';
import {SIGN_IN_START} from "./types";
import Logger from '../../loggingUtil/logger';
import {processStart,processSuccess,processMessage,processError,clearMessage} from './messageActions'
import {getApplicationErrorDTO} from '../utils/errorUtil'
import * as MESSAGES from '../messages/authMessages';

const logger = Logger('Auth-Actions');

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/current_user');

    dispatch({ type: ACTIONS.FETCH_USER, payload: res.data });
};

export const getUserById =(userId)=>async dispatch=>{

    try{
        console.log("ACTION getUserById userId", userId);
        const user = await  axios.get('/user/'+userId);
        console.log("ACTION getUserById", user.data);
       // return (user.data);
        dispatch({type:ACTIONS.GET_USER_BY_ID, payload:user.data});

    }catch(error){

        console.log("ERROR:ACTION getUserById", error);
    }
}

export const updateUser =(userId, values)=>async dispatch=>{

    try{
        dispatch({type: ACTIONS.UPDATE_USER_START});

        const user = await  axios.put('/user/'+userId, values);

        dispatch({type:ACTIONS.UPDATE_USER_END, payload:user.data})

    }catch(error){

        console.log("ERROR:ACTION updatedUser", error);
    }
}

export const createUser = (user, history) => async dispatch => {
    try {

       // dispatch({type: ACTIONS.CREATE_USER_START});
       // dispatch(clearMessage());
       dispatch( processStart({type: ACTIONS.CREATE_USER_START}));
        const res = await axios.post('/signup22', user);
        logger.log('createUser res',res);

        var token;
        if (!!res && !!res.headers) {
            token=res.headers['x-auth'];
        }
        const userData = {
            user: res.data,
            token: token,
            message:MESSAGES.CREATE_USER_SUCCESS,
            errorMessage:""
        };

       // dispatch({type: ACTIONS.CREATE_USER_END, payload: userData});
        dispatch(processSuccess({type: ACTIONS.CREATE_USER_END, payload: userData},MESSAGES.CREATE_USER_SUCCESS));
        localStorage.setItem('token', res.data.token);
    }
    catch (error) {
        const errorDTO = getApplicationErrorDTO(error);
        dispatch({type: ACTIONS.CREATE_USER_ERROR,payload:errorDTO})
        dispatch(processError(error));
    }
};

export const uploadMedia =(data)=> async dispatch =>{

    try{
        let formData = new FormData();
       
        formData.append('lastName', data.lastName);
        formData.append('ImageDropField2', data);
       
       // formData.append('ImageDropField2', data.ImageDropField2);
       logger.log('formData',formData)
       // const res = await axios.post('/fileUpload', formData);
        const res = await axios.post('/video', formData);


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

export const uploadFile =(data)=> async dispatch =>{
logger.log('uploadFile data',data);
    try{
        let formData = new FormData();
        formData.append('file', data);
        const res = await axios.post('/video', formData);
        logger.log('uploadFile res',res);
        return res;


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

// can be used to upload file along with form data 
export const uploadFileWithFormData =(data)=> async dispatch =>{

    try{
        let formData = new FormData();
       logger.log('data.ImageDropField3',data.ImageDropField3)
        formData.append('lastName', data.lastName);

        for (let i = 0; i < data.ImageDropField3.length; i += 1) {
            formData.append('ImageDropField2', data.ImageDropField3[i]);
            logger.log('loop data.ImageDropField2[i]',data.ImageDropField3[i])
          }
       // formData.append('ImageDropField2', data.ImageDropField2);
       logger.log('formData',formData)
       // const res = await axios.post('/fileUpload', formData);
        const res = await axios.post('/video', formData);


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

export const  getImage=(imageUrl)=>async dispatch=>{

    logger.log('getImage imageUrl',imageUrl)
    const res = await axios.get(imageUrl);
    logger.log('getImage res',res);
    return res;
}

export const  getVideo=(videoName)=>async dispatch=>{

    logger.log('getVideo videoName',videoName)
    const res = await axios.get('/videos/'+videoName);
    logger.log('getVideo res',res);
    return res;
}

const delay = ms => new Promise(_ => setTimeout(_, ms));

export const signIn = (userInfo, callback) => async dispatch => {
    dispatch({ type: SIGN_IN_START })
    dispatch(clearMessage())
    logger.log('in sign in actionaaaaa');
    try {
        // simulate delay for 2 seconds for testing
        // to be removed later
        await delay(1000);
        const res = await axios.post('/signin2/', userInfo);
        
        var token;
        if (!!res && !!res.headers) {
            token=res.headers['x-auth'];
        }
         
        if (!!token){
            const userData = {
                user: '',
                token: token,
                error: ''
            };
            dispatch({ type: ACTIONS.SIGN_IN_END, payload: userData })
            localStorage.setItem('token', token);
            callback();
        }else{
            const errorMessage='cannot sign in, contact support';
            dispatch({ type: ACTIONS.SIGN_IN_ERROR, payload: errorMessage })    
        }
    }
    catch (error) {
        dispatch(processMessage(error));
        logger.error('signin error.message qqqqq:',error.message);
        logger.error('signin error.type:',error.type);
        const errorMessage = 'Invalid email or password'
        dispatch({ type: ACTIONS.SIGN_IN_ERROR, payload: errorMessage })
    }
}

const processMessage2=(message)=>{
    if (!!message && !!message.type){
      logger.error('application error xxxxxx:', message);
    }else{
        logger.error('SYSTEM error xxxxx:', message);
    }
}

export const signOut =(callback)=>async dispatch=> {
    
    var token =localStorage.getItem('token');
    
    if (!!token){
        const res = await axios.delete('/token/'+token);
    }
    localStorage.removeItem('token');
    dispatch({type: ACTIONS.SIGN_OUT});
    callback();
};

export const clearErrorMessage = (callback) => dispatch => {
    console.log('ClearErrorMessage');
    dispatch({ type: ACTIONS.CLEAR_ERROR_MESSAGE });
    callback();
}

     export const getUserFromToken=(token)=> async dispatch=>{
        var res;
        if (!!!token){
            token=localStorage.getItem('token');
        }
        try{
           if (!!token){
               res = await axios.get('/user/token/'+token);
               if (!!res && !!res.data){
                   const userData = {
                       user: res.data,
                       token:token,
                       error: ""
                   };
                   dispatch({ type: ACTIONS.GET_USER_BY_TOKEN, payload: userData });
                   localStorage.setItem('token',token);
               }else{
                   localStorage.removeItem('token');
                   const errorData = {
                       user: '',
                       token:'',
                       error:'Sytem Error:user not found by token'
                   };
                   dispatch({type:ACTIONS.GET_USER_BY_TOKEN, payload:errorData})
               }
           }
       }
           catch(error){
            logger.error('getUserFromToken',error);
               localStorage.removeItem('token');
               const errorData = {
                   user: '',
                   token:'',
                   error:'Sytem Error:user not found by token'
               };
            dispatch({type:ACTIONS.GET_USER_BY_TOKEN, payload:errorData});
           }
        }

export const getUserById1 =(userId)=>{

    return {
        lastName:"rajesh"
    }

  
};

  