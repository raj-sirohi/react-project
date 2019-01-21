
import * as ACTIONS from '../actions/types';
import {updateObject} from './utils/reducerUtil';

let initialState={
    blog:{},
    processing:false,
    error:'',
    showError:false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTIONS.CREATE_BLOG_START:
            return updateObject(state, {
                blog: {}, error: "", processing: true
            });
            case ACTIONS.CREATE_BLOG_END:
            return updateObject(state, {
                blog: action.payload, error: "", processing: false
            });
            case ACTIONS.CREATE_BLOG_ERROR:
            return updateObject(state, {
                 error: action.payload, processing: false,showError:true
            });
            case ACTIONS.UPDATE_BLOG_END:
            return updateObject(state, {
                blog: action.payload, error: "", processing: false
            });
            case ACTIONS.UPDATE_BLOG_ERROR:
            return updateObject(state, {
                error: action.payload, processing: false
            });
            case ACTIONS.HIDE_ERROR:
            return updateObject(state, {
                processing: false,showError:false
            });
        default:
            return state;
    }
}