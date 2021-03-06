import React from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react'

export const DropListField = ({ input: { value, onChange, ...input }, label, disabled,
  meta: { touched, error, warning }, as: As = Input, width,...props }) => (
    <React.Fragment>
      <Form.Field disabled={disabled} width={width} error={touched && !!error}>
        <label>{label}</label>
        <Dropdown error={touched && !!error}
          {...input}
          {...props}
          fluid
          onChange={(e, { value }) => onChange(value)}
          clearable
          value={value}
        />
        {touched && ((error && <label 
          className='input__label--error' ><i>{error}</i></label>))}
      </Form.Field>
    </React.Fragment>
  );