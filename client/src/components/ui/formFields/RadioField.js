import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const RadioField = ({ input: { value, onChange, ...input },
    radioValue, meta: { touched, error }, ...props }) => (
        <Form.Radio  {...props}
            checked={value === radioValue}
            error={touched && !!error}
            onChange={(e, { checked }) => onChange(radioValue)} />
    );

