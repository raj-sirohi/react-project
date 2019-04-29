import axios from '../../config/axios/axiosBlog'   //'../config/axios/axiosBlog';
import * as ACTIONS from './types';
import {SIGN_IN_START} from "./types";
import Logger from '../../loggingUtil/logger';

const logger = Logger('Actions - index');

export const submitSurvey=(survey,history)=> async dispatch=>{

    const res = await axios.post('/surveys',survey);
    history.push('/surveys');
    dispatch(fetchSurveys());
};

export const fetchSurveys =()=> async dispatch =>{
    const res = await axios.get('/surveys');
    dispatch({ type: ACTIONS.FETCH_SURVEYS, payload: res.data });
};