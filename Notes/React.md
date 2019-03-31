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
`const createUserActionCreator=>(somevalue)=>(dispatch,state)`=>{`   
   `  make some api call`
    `response = axios.get....`

   ` dispatch ({type:'CREATE_USER', payload:{firstName:'raj'}`
   `})`
`}`
and redux-thunk will invoke our function.

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

