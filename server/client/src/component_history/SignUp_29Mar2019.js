import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import DateCustom from './DateCustom';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class SignUp extends Component {

  state = { date: '' }

  handleChange = (e, { value }) => this.setState({ value })

  handleChange1 = (event, { name, value }) => {
    console.log('*******handleChange1 event', event)
    console.log('*******handleChange1 name', name)
    console.log('*******handleChange1 value', value)
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleChange2 = (event, a) => {

    //const v = event.currentTarget;

    console.log('*******handleChange2 event', event)
    console.log('*******handleChange2 a', a)

  }
  handleFirstNameChange = (event) => {
    event.preventDefault();
    console.log('*******handleFirstNameChange event', event)
    console.log('*******handleFirstNameChange event.target', event.target)
    console.log('*******handleFirstNameChange event.currentTarget', event.currentTarget)
    console.log('*******handleFirstNameChange event.target.input', event.target.input)
    console.log('*******handleFirstNameChange event.target.value', event.target.value)
  }

  DateCustom1 = (input) => {
    console.log('*******custom date input', input)
    return (
      <DateInput
        {...input}
      />
    );
  }

  render() {
    const { value } = this.state
    return (
      <Form>

        <Form.Input label='Custom DOB' placeholder='Custom DOB'
          name='date'
          onChange={this.handleChange1}
          iconPosition='left'
          clearable
          
          clearIcon={<Icon name="remove" color="red" />}
          value={this.state.date}
          control={DateCustom} />

        <Form.Input name='nameFname'
          label='First name'
          placeholder='First name'
          onChange={(e) => console.log(e)}
        />
        <Form.Input label='Last name' placeholder='Last name' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
        <Form.Button>Submit</Form.Button>
        <Form.Group >
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label='Small'
            value='sm'
            checked={value === 'sm'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Medium'
            value='md'
            checked={value === 'md'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Large'
            value='lg'
            checked={value === 'lg'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
export default SignUp;