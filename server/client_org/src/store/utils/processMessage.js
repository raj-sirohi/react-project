import * as ACTIONS from '../actions/types';
import Logger from '../../loggingUtil/logger';

const logger = Logger('processMessage');

export default processMessage=(message)=>dispatch=>{
    if (!!message && !!message.createTime){
        dispatch({})
    }
}
