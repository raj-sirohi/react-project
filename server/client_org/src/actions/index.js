//import axios from 'axios';
import axios from '../config/axios/axiosBlog';
import * as ACTIONS from './types';
import {SIGN_IN_START} from "./types";
import Logger from "../loggingUtil/logger";

const logger = Logger('Actions - index');

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/current_user');

    dispatch({ type: ACTIONS.FETCH_USER, payload: res.data });
};

export const submitSurvey=(survey,history)=> async dispatch=>{

    const res = await axios.post('/surveys',survey);
    history.push('/surveys');
    dispatch(fetchSurveys());
};

export const fetchSurveys =()=> async dispatch =>{
    const res = await axios.get('/surveys');
    dispatch({ type: ACTIONS.FETCH_SURVEYS, payload: res.data });
};

export const createUser2 = (user,history,contactId) => dispatch=> {
    console.log("create user USER------",user);

    console.log("create user contactId------",contactId);

    console.log("create user HISTORY------",history);

        dispatch({type: ACTIONS.AUTH_USER_START});

       setTimeout(()=>{
           dispatch({type: ACTIONS.AUTH_USER_END, payload: ''})
       },5000)

       // dispatch({type: AUTH_USER_END, payload: userData})

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

        dispatch({type: ACTIONS.AUTH_USER_START});

        const res = await axios.post('/signup', user);

        const userData = {
            user: res.data.user,
            token: res.data.token,
            errorMessage:""
        };

        dispatch({type: ACTIONS.AUTH_USER_END, payload: userData});
        localStorage.setItem('token', res.data.token);
    }
    catch (error) {
        dispatch({type: ACTIONS.AUTH_USER_ERROR, payload: error})

    }
};

const delay = ms => new Promise(_ => setTimeout(_, ms));

export const signIn = (userInfo, callback) => async dispath => {
    dispath({ type: SIGN_IN_START })
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
            dispath({ type: ACTIONS.SIGN_IN_END, payload: userData })
            localStorage.setItem('token', token);
            callback();
        }else{
            const errorMessage='cannot sign in, contact support';
            dispath({ type: ACTIONS.SIGN_IN_ERROR, payload: errorMessage })    
        }
    }
    catch (error) {
        processMessage(error);
        logger.log('signin error.message:',error.message);
        logger.log('signin error.type:',error.type);
        const errorMessage = 'Invalid email or password'
        dispath({ type: ACTIONS.SIGN_IN_ERROR, payload: errorMessage })
    }
}

const processMessage=(message)=>{
    if (!!message && !!message.type){
      logger.error('application error:', message);
    }else{
        logger.error('SYSTEM erroraaa:', message);
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

  // Blog actions

export const createBlog = (blog) => async dispatch => {
    let res;
    try {
        logger.log('createBlog ', blog);
        const token = localStorage.getItem('token');
        const authorization = {
            headers: { 'x-auth': token }
        }
        res = await axios.post('/blogs1', blog, authorization);
        logger.log('createBlog res:', res);
        if (!!res) {
            dispatch({ type: ACTIONS.CREATE_BLOG_END, payload: res.data.blog })
        }
    } catch (error) {
        // logger.log('createBlog error:', error.response.data.Error);
         logger.log('createBlog error:', error); // only error object if there is network issue, like database is down
         logger.log('createBlog error.response:', error.response);
         logger.log('createBlog error.response.data:', error.response.data);
        // dispatch({ type: ACTIONS.CREATE_BLOG_ERROR, payload: error.response.data.Error })
        logger.log('createBlog error:', error);
         dispatch({ type: ACTIONS.CREATE_BLOG_ERROR, payload: 'SYSTEM ERROR' })
        await delay(2000);
        dispatch({ type: ACTIONS.HIDE_ERROR })

    }

}

    export const updateBlog=(blogId,blog)=>async dispatch=>{
        let res;
        try{
            const token = localStorage.getItem('token');
        const authorization = {
            headers: { 'x-auth': token }
        }
             res = await  axios.put('/blogs/'+blogId, blog,authorization);
            logger.log('updateBlog res:',res.data.blog);
            if (!!res){
                dispatch({type:ACTIONS.UPDATE_BLOG_END, payload:res.data.blog});
            }
        }
        catch(error){
            logger.log('updateBlog error:', error.response.data.Error);
            dispatch({type:ACTIONS.UPDATE_BLOG_ERROR, payload: error.response.data.Error })

        };
      
}
