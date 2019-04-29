import * as ACTIONS from '../actions/types';
import {updateObject} from '../utils/reducerUtil';
import Logger from '../../loggingUtil/logger'

const logger = Logger('CountryReducer');

let initialState={
    countryList:{}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTIONS.GET_COUNTRY_BY_NAME:
           // logger.log('store localAuthReducer- AUTH_USER_START');
            return updateObject(state, {countryList: action.payload});

        

        default:
            return state;
    }
}