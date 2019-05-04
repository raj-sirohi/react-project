import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const InputField = ({ input, type, label, placeholder,
  meta: { touched, error, warning }, as: As = Input,width, ...props }) => {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field width ={width} error={touched && !!error}>
      <label>{label}</label>
      <Input {...props} {...input} type={type} 
      value={input.value} placeholder={placeholder} 
      onChange={handleChange} />
      {touched && ((error && <label className='input__label--error' ><i>{error}</i></label>))}
    </Form.Field>
  );
}