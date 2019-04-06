import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import moment from 'moment'
import classnames from 'classnames'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './dateField.css';
import Logger from 'logger';


const logger = Logger('dateField');

export const dateField = ({input,label,  defaultValue, meta: {touched, error},...rest}) => {
    logger.log('renderDatePicker touched',touched)
    logger.log('renderDatePicker error',error)
    
    return (
        <div className={classnames('form-group', { 'has-danger': error })}>
      <label className='form-col-form-label'>{label}</label>
        <DatePicker {...rest} className="errorField"
        selected={input.value ? moment(input.value).toDate() : null}
            onChange={input.onChange}
            onBlur={() => input.onBlur(input.value)}
            
        />
         {touched && ((error && <span><i>{error}</i></span>)) }
        </div>
    )
  }