import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import moment from 'moment'
import classnames from 'classnames'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './dateField.css';
import Logger from 'logger';


const logger = Logger('dateField');

export const dateField = ({ input, label, defaultValue, meta: { touched, error }, ...rest }) => {
   // logger.log('renderDatePicker touched', touched)
    //logger.log('renderDatePicker error', error)

    return (
        <div>
            <Form.Group>
                <Form.Field error={touched && !!error} >
                    <label  >{label}</label>
                    <DatePicker {...rest}
                        selected={input.value ? moment(input.value).toDate() : null}
                        onChange={input.onChange}
                        onBlur={() => input.onBlur(input.value)}
                    />
                    {touched && ((error && <label className='form_input--errorMessage' ><i>{error}</i></label>))}
                </Form.Field>
            </Form.Group>
        </div>

    )
}