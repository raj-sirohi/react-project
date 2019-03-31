### Mac short cuts
- desktop :fn + f11
- show hidden files on finder: shift+cmd+.
- hide hidden files on finder : shift+cmd + .

### Mac terminal
- go to end of line in teminal : `control + e`
- go to begining of line in terminal: `control + a`
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
- end of line - cmd + right arrow
- multi cursor : cmd+click
- format document : shift+option+f
- comment block : shift+option+A
- line comment :command +/

### materia ui
- if material ui components are used then it uses material ui font, otherwise
font set in index.css. Therefore need to set the font in index.css
- in Firefox if you examine element on the top it will show element.style{}, so if you want to override any style use style props, eg style={{padding:'10px'}}.
- if you uses classes props, then it has to be an object, and style should be in in the css properties of the api, for eg root is defined as one of the css props, so it can be overridded as classes{{root:'youclassName}}


### Mongo db
- start db: navigate to ~/mongo/bin, then give command ./mongod --dbpath ~/mongo-data
- to start mongo command line instructions, go to bin and give command ./mongo, this starts shell where you can insert, update etc into mongo from command line.

### Node js

- (axiosBlog) in order to display the errorDTO, ( using console.log)use errorDTO.toJSON. If only errorDTO is used it displayed as an object, and values cannot be displayed.
- to check what versions of package are available - `npm view <packageName> version` 
- to check where global modules are installed: `npm root -g`
- to check if the package is installed globally or locally
npm list -g gulp ( for gloaba)
npm list gulp ( for local)

#### uninstall node modules
- `npm uninstall packageName`: removes the module from node_modules, but not package.json
- `npm uninstall packageName --save`: also removes it from dependencies in package.json
- `npm uninstall packageName --save-dev`: also removes it from devDependencies in package.json
- `npm -g uninstall packageName --save`: also removes it globally

#### absolute paths in react
- in order to avoid long import path for logger as below:-  
  `import Logger from '../../loggingUtil/logger'`  
  create .env file at root, same as package.json, and enter the following values:-  
    `NODE_PATH=src/loggingUtil` 
    Now we can import logger as :-  
    `import Logger from 'logger';` 
    <strong>Note:</strong> we are setting node_path to  `src/loggingUtil` , for making it convenient to import logger.
    If we set the path as `NODE_PATH=src` then we can import other files without giving full path. For now we want to avoid confusion betweeen importing our modules and the node_modules, so keep it restricting  to `src/logginUtil`

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
- to pass parameter to onClick do like this
onClick ={()=>this.test(parameter)}
if want to also pass event then do the following
onClick={(e)=>this.test(e,parameter)}

- javascript expressions are evaluated immediately,
for eg a=2+4,test(), so if you do onClick=(this.test()), then this.test() will execute immediately and assign it to onClick, which we don't want,
so do this onClick()={()=>this.test()}

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

- git status
- git add .
- git commit -m "message"
- removed specific folder which has been added or committed:-
git rm -r --cached server/node_modules

- push files to remote repository
git push origin master
<strong>Note:</strong> for passphrase check <strong>privateConfiguration.md</strong>

- after software update, git may not work, so run the following command on terminal  
`xcode-select --install` 
then you will be prompter in window to update,select install, after install it will work again. This will also fix git issue in visual studio code.