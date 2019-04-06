### Javascript
- object and arrays are mutable.
   const colors =['red','green']
   colors.push('pink')
   so we have changed the original colors array, i:e we have have mutated the array.

   const objectA={name:'raj'}
   objectA.lastName='sirohi'
   we have changed the objectA, that is we have mutated.

   so if we want don't want to mutate an array or object use the following:
   <pre>  
   Arrays  
   mutate              immutable  
   color.pus()        [...colors, 'pink']
   color.pop()         colors.filter
   color[0]='blue'     color.map  

   Object
   objectA.name='test    [...objectA, name:'test']
   object.age='30'       [...objectA,age:'30']
   delete object.age     _.omit(objectA, age) (lodash lib)
   (delete an property)
  </pre>
- string and numbers is not mutable.
  const name = 'raj'
  name.[0], will return 'r'
  now lets change
  name.[0]='a'
  now lets pring name, it will still return raj

- triple === compare values for primitives, but for object and arrays it compares memory address
 color===['red',green], will return false

 ### Object destructuring
 <pre>
 const person ={
   firstName:'raj',
   lastName:'sirohi',
   dob:'07-11-1965',
   address :{
     city:'coq',
     state:'bc',
     country:'canada'
   }
 }
 </pre>

 `const {firstName,lastName:lname,address:{city,state,...address}}= person`  
 it will do the follows:
  - create new variable firstName and extract firstName value from person in it.
  - looks for lastName in person and assign it to lname.
  - look for address in person, and then destructure address by creating three variables ,city,state and state, state comes from ...address.
 so our const will look like this:   
 `const{firstName,lname,city,state,country}`  
  <strong>note:</strong>...address will not contain city and state, since we already pulled it from address. So if we print address, it will display only country.  
  Also note we cannot do this `address:{city,state}` because address also contains country and we are not creating variable for it.