/* Following is the example for usage as component in Redux Field.

<Field
    component={RadioMultiField}
    label="RadioMulti"  <-- label for the radio group ->
    name="radioMulti2"
    vertical          <--- if you omit this props, its displays inline ->
    testValue ={[{label:'labelOne',value:'one'},
    {label:'labelTwo',value:'two'}]} 
    validate={required}
/> 
*/
import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './FormField.css'
import Logger from 'logger';

const logger = Logger('RadioMultiField');

class RadioMultiField extends Component {
   
    render() {
        const { input: { value, name, onChange }, vertical = false,disabled,
            label, testValue, meta: { touched, error },width, ...props } = this.props
        var radioArray = testValue.map(val => {
            var label = val.label;
            var radioValue = val.value;
            return (
                <Form.Field disabled={disabled} width={width}
                    error={touched && !!error} key={radioValue}>
                    <Radio 
                        label={label}
                        name={name}
                        value={radioValue}
                        checked={value === radioValue}
                        onChange={(e, { checked }) => onChange(radioValue)}
                    />
                </Form.Field>
            )
        });
        const radioLayout = vertical ? { grouped: true } : { inline: true }
        const labelClassName = touched && !!error ? 'label--color-error' : '';
        const formGroupClassName = touched && !!error ? 'form-group' : 'form-group--margin-bottom-1em'

        return (
            <React.Fragment>
                <Form.Group  {...radioLayout} className={formGroupClassName} >
                    <label className={labelClassName}>
                        {label}
                    </label>
                    {radioArray}
                </Form.Group>
                {touched && ((error && <label
                    className={['label',
                        'label--margin-bottom-1em', 'input__label--error'].join(' ')} >
                    <i>{error}</i></label>))}
            </React.Fragment>
        );
    }
}

RadioMultiField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    testValue:PropTypes.array.isRequired,
    meta: PropTypes.object
   
  };

export default RadioMultiField