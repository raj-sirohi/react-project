import * as ACTIONS from '../actions/types';
import { updateObject } from '../utils/reducerUtil';
import Logger from '../../loggingUtil/logger';

let logger = Logger('messageReducer');

let initialState = {
    errorDTO: {},
    type: '',
    title: '',
    message: '',
    error: '',
    display: false

};

export default function (state = initialState, action) {

    switch (action.type) {
        
        case ACTIONS.CREATE_ERROR_MESSAGE:
            return updateObject(state, {
                errorDTO: action.payload, type:action.payload.type, title:action.payload.title,
                  error: action.payload.error,message:'', display: true
            });

        case ACTIONS.CREATE_MESSAGE:
            return updateObject(state, {
                errorDTO: {}, error: '', type: '', title:'',message: action.payload, display: true
            });

        case ACTIONS.HIDE_MESSAGE:
            return updateObject(state, { display: false });

        case ACTIONS.CLEAR_MESSAGE:
            return updateObject(state, { errorDTO: {}, type: '', title: '', error:'',message: '', display: false });

        default:
            return state;
    }
}