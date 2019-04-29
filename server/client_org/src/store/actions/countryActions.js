//import axios from 'axios';
import axios from '../../config/axios/axiosBlog'   //'../config/axios/axiosBlog';
import * as ACTIONS from './types';
import { SIGN_IN_START } from "./types";
import Logger from '../../loggingUtil/logger';
import { processStart, processSuccess, processMessage, processError, clearMessage } from './messageActions'
import { getApplicationErrorDTO } from '../utils/errorUtil'
import * as MESSAGES from '../messages/authMessages';

const logger = Logger('CountryActions');

const delay = ms => new Promise(_ => setTimeout(_, ms));
export const getCountryListByName = (country) => async dispatch => {
    try {
        dispatch(processStart());
        const resp = await axios.get('/country/' + country);

        return resp.data;
    } catch (error) {
        logger.error("ERROR:ACTION getCountryListByName", error);
        dispatch(processError(error));
    }
}



