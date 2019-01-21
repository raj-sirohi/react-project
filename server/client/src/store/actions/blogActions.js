import axios from '../../config/axios/axiosBlog'   //'../config/axios/axiosBlog';
import * as ACTIONS from './types';
import {SIGN_IN_START} from "./types";
import Logger from '../../loggingUtil/logger';
import {processMessage,clearMessage} from './messageActions'

const logger = Logger('Blog-Actions');

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
