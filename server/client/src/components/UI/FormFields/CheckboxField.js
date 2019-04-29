import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import './FormField.css'

export const CheckboxField = ({ input: { value, onChange, ...input }, type, label, placeholder,
    meta: { touched, error }, ...props }) => {

    return (
        // <React.Fragment>
        //     <Form.Checkbox
        //         className={(touched && !!error) ? 'checkbox__label--error' : ''}
        //         error={touched && !!error}
        //         {...input}  {...props}
        //         checked={!!value}
        //         label={label}
        //         onChange={(e, data) => onChange(data.checked)} />
        //     {touched && ((error && <label 
        //     style={{ display: 'inline-block', marginBottom: '14px' }}
        //         className='field__label--error' ><i>{error}</i></label>))}
        // </React.Fragment>


        <Form.Field error={touched && !!error}>
            <Checkbox
                {...input}  {...props}
                checked={!!value}
                label={label}
                onChange={(e, data) => onChange(data.checked)} />
            {touched && ((error && <label
                style={{ display: 'block'}}
                className='input__label--error' ><i>{error}</i></label>))}
        </Form.Field>
    );
}