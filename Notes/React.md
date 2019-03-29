### <strong>React components</strong>
- custom components can be used as follows:-   
define custom component:   
`customDate =(input)=>{
      return (
        <DateInput
        {...input}
        />
      );
  }` 

  This component can be used as :-  
  `<Form.Input  label='Date of birth'  placeholder='DOB' name ='date' onChange={this.handleChange1} 
         iconPosition='left'
         clearable
          closable
          clearIcon={<Icon name="remove" color="red" />}
          value={this.state.date} 
          control={this.customDate} />` 

    or :-  
    `<this.customDate onChange={this.handleChange2}  name="date"  placeholder="Date of birth aaaaa" value={this.state.date}  />`   
    In both cases customDate will receive all the props passed to the component.  
    <Strong>Note:</strong>in above case we are calling this.handleChange, component DateInput invokes this handler with two parameters, event and and an object which contains all the props passed to the component, such as name, placeholder etc.However if we invoke the handler as 
    `onChange={()=>this handleChange2()}` then no properties will be passed, since we are overriding the values which are being passed by DateInput component. 

- if we set the intial value of the component as follows:-  
   `<Form.Input name ='nameFname'  
              label='First name' 
              value= 'Rajesh'  <-- setting the initial value
              placeholder='First name' 
               />`  
    <strong>Now if user types in the field its value will not be changed</strong>

    <strong>Note:</strong> when we set the intial value of the component , it becomes controlled component. Meaning value is not set via the DOM to the native input component, when user types in the field. Once component becomes controlled we need to change it ourself by using onChange event.


#### Redux Form
- when field is used from redux form , field passes input, name, meta etc as props to the component. Redux form connect  Field compnent  to the redux store, and when user makes changes to the component it automatically fires onChange to change the state in redux store, due to which its value is updated automatically as compared to non redux fields where we need to write onChange to change the state. 
- If we used third party component in redux form , at minimum we need to connect the value and onChange of the third party component to the props passed for value and onChange from redux form.

