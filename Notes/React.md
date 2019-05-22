### <Strong>Redux Concept</strong>
- redux has three components, action creator, action and reducer. 
  - action is a simple javascript object with property type and optional property of payload :  
  `{ type: 'CREATE_USER', 
  payload: {firstName:'raj' }`
  - action creator: is a function which returns an action:
    `function createUserActionCreator({firstName"'raj})
    {
        return (
            { type: 'CREATE_USER', 
             payload: {firstName:'raj' }
        )
    }` 
  -  store: store contains the state of redux, and each state is made up of reducer. So there can be multiple reducers eg userReducer,blogReducer. Then we can create combined store for all the reducers as :
  store =createStore(ourReducer) // for single reducer
  
  // for all reducers
   const allReducer=combineReducers({
    user: userReducer,
    blog:blogReducer
   })
   store =createStore(allReducers)
  - dipatch: dispatch is an function used to dispatch action to the reducers.when we dispatch an action, its dispatched to all reducers, and which ever reducer has action type matching the action, is executed and it return updated state
  store.dispatch(createUserActionCreator(payload))
  - reducer : maintains the state for redux, when an action is dispatched it returns the updated state.When an action is dispatched its dispached to all reducers
  <strong>reducer state should be immutable, i:e we should not update the existing state, but return new state. Otherwise sometimes redux may think state is same, since its a object, and may not update the props when we pass state from mapStateToProps in connect function. Result of which will be that our component will not be updated.</strong>

#### Redux in React
- in React we use Provider funtion to pass the store the react components, so store is availabe to all the components.  
`<Provider store={store}>
    <App />
</Provider>` 
- Once store is passed we use connect function to access the state as follows:
`const mapStateToProps = state => {
    return {user:state.user}
}  `  
`export default connect(mapStateToProps)(myComponent)`   
<Strong>Note:</strong> if console.log(this.props) in render(), it will user will be availabe as a props. Basically state will be displayed as object with two values , user and dispatch. IF we just returned state from mapStateToProps, then it would display entire state and the dispatch function.
- if we want to dispatch and action from react component we import the action creator ( action creator returns an action), and pass it to connect function.  
`export default connect(mapStateToProps,{createUserActionCreator})(myComponent)`  
now if we call `this.createUserActionCreator({})`, connect will wrap the call with dispatch as below: 
`dispatch(this.createUserActionCreator({}))`  
<strong>Note:</strong> if we simply import the action creator and don't pass it with to connect and call this.createUserActionCreator({}), then it will not be dispached, because connect dispaches it behind the scene.  
Also note if we do console.log(this.props) now it will show
state object with two values as user and createUserActionCreator. Dispatch will not be shown, because we are passing our own function to connect as second parameter.
#### redux-thunk
- Dipatch expects a simple javascript object with one property of type and other optional of payload.
- when we use redux with react we may want to call another funtion to get the data, such as async api call, and once data is received then we want to dispatch the action. This is not possible because when we use connect to dispatch the action, it is dispatched immediately to the reducer, there is no chance for us to interfere with dispatch action, since dispatch is part of redux. 
For eg, when we call createUserActionCreator({}), connect function dispatches the action returned by createUserActionCreator, and the action is the simple javascript object. There is no way for us to fetch the data then call the dispatch.
This is where redux-thunk middleware comes handy. With redux-thunk middleware, when connect invokes dispatch it is passed to redux-thunk.
<Strong>redux-thunk allows the action creator to return action of function, so if action creator returns function, redux-thunk executes that function, and also passes two parameters to the function, dispatch and getState(), dispatch is same what is passed from connect.</strong> which means that in action creator we can return our function, and since redux-thunk passes dispatch and state( i:e current state of the reducer),we can make api call can once we get the data we can invoke dispatch.  
so with redux-thunk, in  action creator we can return the function as follows:  
<pre>
const createUserActionCreator=>(somevalue)=>(dispatch,state)=>{  
     //make some api call
    response = axios.get....

    dispatch ({type:'CREATE_USER', payload:{firstName:'raj'}
   })
}
</pre>
and redux-thunk will invoke our function.

### <strong>React components</strong>
- consider following code: 
<pre>
 < Field
            component={semanticFormCheckBox}
            as={Form.Checkbox} 
            defaultChecked={true}
            label="last name"
            name="lastName"
            type='checkbox'
            bogusProps='bogusValue'
            placeholder="last name"
          />
</pre>

if we define component as follows
<pre>
const semanticFormCheckBox =(props)=>
   {
   }
</pre>  
then following props will be passed by redux Field component to semanticFormCheckBox:  
  - input : which contains, name, value, onchange, onblur etc.
  - meta: which contains , error, form,pristine, touched etc
  - and other props such as, bogusProps,placeHolder,label,type,
    defaultCheckedValue.
 so if we spread the props in semanticCheckBox component as follows
   <pre>
   const semanticFormCheckBox =(props)=>
   {
  return (
    < Form.Field>
      < Form.Checkbox  {...props}   />
      {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
    </Form.Field>
  );
}
   </pre> 
   then there are few problems as below:  
    -  checkBox doesn't have value, since props has value, it will give error as invalid prop value passed, because spreading props will create code as value = 'someValue' 
    - onChange will have a default value, as onChange='someFunction'.But in checkBox onChange should be as follows:  
    `onChange={(e, data) => input.onChange(data.checked)}`  
    so clicking checkbox will not work.
    - extracting error , touched will be not easy, as we will have to do something like this 
    `props.meta.touched && ((props.meta.error...`   
    <Strong>Solution:</strong> lets extract the data we need to we can use correctly as below:
    first lets extract relevant properties from input as below  
    `{input: { value, onChange, ...input }}` 
    this means looks for property input in props,then assign value from input to value, onchange to onchange, and remaining spread it.we are extracting value, onChange from input and then remaining we are spreading using rest operator. So basically  input object will contain following  values:value, onchange, and ...input will contain onBlur,onDrag etc, note ...input will not contain value and onChange, since we extracted from it.
    So now if we spread input as {...input} in checkBox it will not contain value and Onchange.Now we can bind the onChange passed to us with out code as follows:
    `onChange={(e, data) => onChange(data.checked)}`
      
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

    <strong>Note:</strong> when we set the intial value of the component , it becomes controlled component. Meaning value is not set via the DOM to the native input component, when user types in the field. Once component becomes controlled we need to change it ourself by using onChange event.However if we use semantic-ui field component and provide value ={this.state.vaue}, then if on changeHandler is not provided then state will not be updated.<Strong>when we give value ='something' then that value is passed to the component and it becomes controlled component and it displays the values. Now we use input.onChange(XXX), to set the value for the input.value when ever we change the value</strong>


#### Redux Form
- when field is used from redux form , field passes input, name, meta etc as props to the component. Redux form connects Field compnent  to the redux store, and when user makes changes to the component it automatically fires onChange to change the state in redux store, due to which its value is updated automatically as compared to non redux fields where we need to write onChange to change the state. 
- If we used third party component in redux form , at minimum we need to connect the value and onChange of the third party component to the props passed for value and onChange from redux form.
- when we use redux form, when form is submitted, onSubmit call handleSubmit, which invokes the function we pass to it, with two parameters, values and dispatch.
There if we do onSubmit ={this.ourSubmitHandler}, then values as name value pair and dispatch will not be passed to it. So if we want to pass the values and dispatch
then we need to use like this onSubmit={handleSubmit(this.ourSubmitHandler)}.
- if ourSubmitHandler is outside the class then we need to set the property as follows, so its passed as props to handleSubmit as below 
<pre> 

 < Form onSubmit={handleSubmit}>

 // outside the class
 ourSubmitHandler =(values, dispatch)=>{

 }
 export default compose(
   connect(mapStateToProps),
  reduxForm({
    validate,
    form: 'SignUpForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
   onSubmit:ourSubmitHandler

  })
)(SignUpForm);
</pre>

<strong> < Form/> component can be from semantic-ui-react or it can form component < form/>
redux-form </strong>

### React General
- PropTypes ensure that the right type of props is passed to a component  and, conversely, that the receiving component is receiving the right type of props.

 <pre>
  Person.propTypes = {
    email: PropTypes.string,
    age: PropTypes.number,
    adult: PropTypes.bool,
    name:PropTypes.string.isRequired
    handleSubmit: PropTypes.func
    countryDefault:'canada' 
    (countryDefault will have value Canada,if its not passed)
}
</pre>

- do not directly update the state, if updated directly then it may not work correctly.
 For example componentDidUpdate will not see this as an update because it's modified directly.
  <strong> Wrong way!</strong>
handleChange = (e) => {
    const { items } = this.state;
    items[1].name = e.target.value; <---- directly modifying the state

    // update state
    this.setState({
        items,
    });
};

<strong> Correct Way</strong>

handleChange = (e) => {
    this.setState(prevState => ({
        items: {
            ...prevState.items,
            [prevState.items[1].name]: e.target.value,
        },
    }));
};