### Mac short cuts
- desktop :fn + f11
- show hidden files on finder: shift+cmd+.
- hide hidden files on finder : shift+cmd + .

### Mac terminal
- hidden file : ls -a
- display full path: create new file : sudo nano ~/.bash_profile ( file didn't exist so created new one )
-  add following line :
PS1="\w$ "
- to stop mongod running on another instance: 
   pgrep mongo ( this will list process id)
   kill processId ( the one listed in above command)

   ### react
   - to run application:
   
      cd server

      npm run dev

   - axios - if you create global interceptor and interceptors on instance, then
   if file uses instance of axios then only instance interceptor will fire.However global default set on global axios are combined to the default of axios instance



### visual studio code
- to support html in jsx added following line in  settings:
 <s>
  "emmet.includeLanguages": {
        "javascript": "html"
    }
</s>
```
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.triggerExpansionOnTab": true
```
- Save All: option + cmd +s
- command pallet : shift+cmd+p
- keyboard shortcuts : code>preferences>keyboard shortcuts (cmd +k cmd+s)
- open file : cmd +p
- back: control+ -
- forward : shift + control+ -
- find : cmd+f
- delete line : shift + cmd+ K
- copy line down : shift +option + downarrow
- cusor to end of line : cmd + right arrow
- copy from cursor to end of line : shift + cmd + right arrow
- multi cursor : cmd+click
- format document : shift+option+f

### materia ui
- if material ui components are used then it uses material ui font, otherwise
font set in index.css. Therefore need to set the font in index.css
- in Firefox if you examine element on the top it will show element.style{}, so if you want to override any style use style props, eg style={{padding:'10px'}}.
- if you uses classes props, then it has to be an object, and style should be in in the css properties of the api, for eg root is defined as one of the css props, so it can be overridded as classes{{root:'youclassName}}


### Mongo db
- start db: navigate to ~/mongo/bin, then give command ./mongod --dbpath ~/mongo-data
- to start mongo command line instructions, go to bin and give command ./mongo, this starts shell where you can insert, update etc into mongo from command line.

319585 apple id verification code

### Node js

- (axiosBlog) in order to display the errorDTO, ( using console.log)use errorDTO.toJSON. If only errorDTO is used it displayed as an object, and values cannot be displayed.


### React
- ( eg authActions)  when error is thrown , it contains response object and response object
contains the data object which contains the errorDTO thrown from the server.
- if there is network issue  not able to connect to server then error has the 
value 'Request failed with status code 404' and 
 error.response.data object which contains the html document :-

`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot POST /api/signup22</pre>
</body>
</html> `

- if database is down then response is undefined in error  ( because request didn't go through) and error contains values as :-
message:"timeout of 5000ms exceeded"

- you can also access property : label={`phone ${label}`}

### Java script

-  in es6 classes, variables ( let, conts, var) can be defined inside constructor and methods.
- cannot use let, const, var at class level
- to define class levet attributes ( properties), use a = 1;, and they can be accessed using this.a
- any method defined on the class ( without this keyword  eg test() ) is on the prototype of the class,
so all instances of the class share the same method. Method defined with this, eg this.test(), is on the instance of the class.
- when console.log is used to log an object ( instance of class), it displays intance methods, instance properties, and protottyp contains the method which are defined without this.

##### JSON
- you can use toJSON method to customise the way your class serialises to JSON:
- JSON.stringify() will call your objects toJSON() method .
- you don't need to call toJSON(), it will be called when object is serialized
- JSON.Stringify() converts object to string, whole object is within string eg
   let A= "{"name":"rajesh"}"  ( note everything is within string).
    so you cannot access the elements of JSON.Stringify() like A.name, its undefined.
    In order to access its properties you need to user JSON.parse(A), this will convert into
    object , eg : {name:"rajesh"}, now you can access if as A.name

### GIT
- removed specific folder which has been added or committed:-
git rm -r --cached server/node_modules

