import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const semanticInput = ({ input, type, label, placeholder,
  meta: { touched, error, warning }, as: As = Input, ...props }) => {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As {...props} {...input} error={touched && !!error} value={input.value}
       type={type} label={label} placeholder={placeholder} onChange={handleChange} />
      {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
    </Form.Field>
  );
}