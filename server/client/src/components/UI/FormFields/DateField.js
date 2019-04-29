import React from 'react';
import { Form } from 'semantic-ui-react';
import moment from 'moment'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './FormField.css';
import Logger from 'logger';

const logger = Logger('dateField');

export const DateField = ({ input, label, defaultValue, meta: { touched, error }, ...rest }) => {
    return (
        <Form.Field error={touched && !!error} >
            <label  >{label}</label>
            <DatePicker {...rest}
                selected={input.value ? moment(input.value).toDate() : null}
                onChange={input.onChange}
                onBlur={() => input.onBlur(input.value)}
            />
            {touched && ((error && <label className='input__label--error' ><i>{error}</i></label>))}
        </Form.Field>
    )
}