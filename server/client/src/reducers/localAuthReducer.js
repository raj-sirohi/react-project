import * as ACTIONS from '../actions/types';
import {updateObject} from './utils/reducerUtil';

let initialState={
    user:{},
    processing:false,
    authenticated:'',
    errorMessage:''
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTIONS.AUTH_USER_START:
        console.log('localAuthReducer- AUTH_USER_START');
            return updateObject(state, {user: {}, authenticated: "", errorMessage: "", processing: true});

        case ACTIONS.AUTH_USER_END:
            return updateObject(state, {
                user: action.payload.user,
                authenticated: action.payload.token,
                processing: false
            });

        case ACTIONS.AUTH_USER_ERROR:
            return updateObject(state, {
                user: {},
                authenticated: "",
                errorMessage: action.payload.error,
                processing: false
            });

        case ACTIONS.UPDATE_USER_START:
            return updateObject(state, {errorMessage: "", processing: true});

        case ACTIONS.UPDATE_USER_END:
            return updateObject(state, {user: action.payload.user, errorMessage: "", processing: false});

        case ACTIONS.SIGN_OUT:
            return updateObject(state,{user:{},authenticated:'',errorMessage: ""});
        case ACTIONS.SIGN_IN_START:
            return updateObject(state,{processing:true,errorMessage:''});
        case ACTIONS.SIGN_IN_END:
            return updateObject(state,{user:action.payload.user,errorMessage:'',authenticated:action.payload.token,processing:false});
        case ACTIONS.SIGN_IN_ERROR:
            return updateObject(state,{errorMessage:action.payload,  processing:false});
        
        case ACTIONS.GET_USER:
        return updateObject(state,{user:action.payload.user,errorMessage:action.payload.error,authenticated:action.payload.token,processing:false});

        case ACTIONS.GET_USER_BY_TOKEN:
        return updateObject(state,{user:action.payload.user,errorMessage:action.payload.error,authenticated:action.payload.token,processing:false});

        case ACTIONS.GET_USER_BY_ID:
            return updateObject(state, {user: action.payload});

        case ACTIONS.CLEAR_ERROR_MESSAGE:
            return updateObject(state,{errorMessage:''});

        default:
            return state;
    }
}