import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import blogReducer from './blogReducer';
import messageReducer from './messageReducer'
import countryReducer from './countryReducer'

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    blog:blogReducer,
    surveys: surveysReducer,
    message:messageReducer,
    country:countryReducer
});
