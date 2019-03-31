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