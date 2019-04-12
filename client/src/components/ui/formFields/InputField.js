import React from 'react';
import { Form, Input } from 'semantic-ui-react';


const errorStyle = {
  fontWeight:'var(--input-errorMessage-font-weight)'
};
export const semanticInput = ({ input, type, label, placeholder,
  meta: { touched, error, warning }, as: As = Input, ...props }) => {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    // <Form.Field>
    //   <As {...props} {...input} error={touched && !!error} value={input.value}
    //    type={type} label={label} placeholder={placeholder} onChange={handleChange} />
    //   {touched && ((error && <label><i>{error}</i></label>) || (warning && <span><i>{warning}</i></span>))}
    // </Form.Field>

    <Form.Field error={touched && !!error}>
    <label>{label}</label>
  <Input {...props} {...input} type={type} value={input.value} placeholder={placeholder} onChange={handleChange}

  />
     {touched && ((error && <label className='form_input--errorMessage' ><i>{error}</i></label>))}
  </Form.Field>


  );


}