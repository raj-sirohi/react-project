import React from 'react';
import { Form, Input,Dropdown } from 'semantic-ui-react'

export const dropList = ({ input: { value, onChange, ...input },label,
    meta: { touched, error, warning }, as: As = Input, ...props }) => (
      // <React.Fragment>
     
      // <Form.Dropdown error={touched && !!error} 
      // className={(touched && !!error) ? 'aaa' : ''}
      //   {...input}
      //   {...props}
      //   fluid
      //   label={label}
      //   onChange={(e, { value }) => onChange(value)}
      //   clearable
      //   value={value}
      // />
        
    
      // {touched && ((error && <label style={{ display: 'inline-block', marginBottom: '14px' }}
      //             className='form_input--errorMessage' ><i>{error}</i></label>))}
      // </React.Fragment>

      <React.Fragment>
        <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <Dropdown error={touched && !!error} 
     // className={(touched && !!error) ? 'aaa' : ''}
        {...input}
        {...props}
        fluid
        
        onChange={(e, { value }) => onChange(value)}
        clearable
        value={value}
      />
        
    
      {touched && ((error && <label style={{ display: 'inline-block', marginBottom: '14px' }}
                  className='form_input--errorMessage' ><i>{error}</i></label>))}
     </Form.Field>
      </React.Fragment>
    );