import * as ACTIONS from '../actions/types';
import {updateObject} from '../utils/reducerUtil';
import Logger from '../../loggingUtil/logger'

const logger = Logger('AuthReducer');

let initialState={
    user:{},
    processing:false,
    token:'',  // not needed
   message:'',
    error:'' 
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTIONS.CREATE_USER_START:
             logger.log('store localAuthReducer- AUTH_USER_START');
            return updateObject(state, {user: {}, token: "",message:'', error: "", processing: true});

        case ACTIONS.CREATE_USER_END:
        logger.log('CREATE_USER_END',action);
            return updateObject(state, {
                user: action.payload.user,
                token: action.payload.token,
                message:action.payload.message,
                error:"",
                processing: false
            });

            case ACTIONS.CREATE_USER_ERROR:
            logger.log('CREATE_USER_ERROR',action);
            return updateObject(state,
                {user: {}, 
                token: "", 
                message:'',
                error: action.payload,
                 processing: false});

       
        case ACTIONS.UPDATE_USER_START:
            return updateObject(state, {errorMessage: "", processing: true});

        case ACTIONS.UPDATE_USER_END:
            return updateObject(state, {user: action.payload.user, errorMessage: "", processing: false});

        case ACTIONS.SIGN_OUT:
            return updateObject(state,{user:{},token:'',errorMessage: ""});
        case ACTIONS.SIGN_IN_START:
            return updateObject(state,{processing:true,errorMessage:''});
        case ACTIONS.SIGN_IN_END:
            return updateObject(state,{user:action.payload.user,errorMessage:'',token:action.payload.token,processing:false});
        case ACTIONS.SIGN_IN_ERROR:
            return updateObject(state,{errorMessage:action.payload,  processing:false});
        
        case ACTIONS.GET_USER:
        return updateObject(state,{user:action.payload.user,errorMessage:action.payload.error,token:action.payload.token,processing:false});

        case ACTIONS.GET_USER_BY_TOKEN:
        return updateObject(state,{user:action.payload.user,errorMessage:action.payload.error,token:action.payload.token,processing:false});

        case ACTIONS.GET_USER_BY_ID:
            return updateObject(state, {user: action.payload});

        case ACTIONS.CLEAR_ERROR_MESSAGE:
            return updateObject(state,{errorMessage:''});

        default:
            return state;
    }
}