import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const semanticCheckbox = ({ input: { value, onChange, ...input }, type, label, placeholder,
    meta: { touched, error }, ...props }) => {

    return (
        <React.Fragment>
           
                <Form.Checkbox className={(touched && !!error) ? 'aaa' : '50px'} error={touched && !!error}
                 {...input}  {...props}
                    checked={!!value}
                    label={label}
                    onChange={(e, data) => onChange(data.checked)} />
          
            {touched && ((error && <label style={{ display: 'inline-block', marginBottom: '14px' }}
                className='form_input--errorMessage' ><i>{error}</i></label>))}
        </React.Fragment>
    );
}