import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const semanticRadio = ({ input: { value, onChange, ...input }, 
    radioValue, meta: { touched, error, warning },as: As = Input, ...props })=> (
      <Form.Field>
      <As   {...props}  
      checked={value === radioValue}
      error={touched && !!error}
      onChange={(e, { checked }) => onChange(radioValue)}/>
      
      </Form.Field>
  );

