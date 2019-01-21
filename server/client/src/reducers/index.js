import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import localAuthReducer from './localAuthReducer'
import blogReducer from './blogReducer';
import account from "../components/localAuthentication/account";
import messageReducer from '../store/reducers/messageReducer'

export default combineReducers({
    auth: authReducer,
    localAuth:localAuthReducer,
    form: reduxForm,
    account,
    blog:blogReducer,
    surveys: surveysReducer,
    message:messageReducer
});
