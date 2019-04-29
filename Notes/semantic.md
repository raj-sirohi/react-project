## Semantic UI Installation and Customization
### installation
- npm install semantic-ui-react
- npm install semantic-ui-css

- then in index.js file add following line  
 `import 'semantic-ui-css/semantic.min.css'`

 - now use can use semantic ui from default theme, that is without any customization

 ### customizing semantic ui
 - when installing semantic-ui for react, alsways install in client/src/semantic, where client is the root folder.
 - go to client folder and intall semantic ui. ( client is root folder) 
 `npm install semantic-ui --save`

 - after the install it will ask questions:-
  - - chose express ( whith arrow keys), and hit enter
  - - say yes to the the question 'is this is your project folder?'
  - - enter values as 'src/semantic' for question 'where should we put semantic ui inside your project'

  - - press enter, to the question what components should we include in the package. Enter means select all components.

  - -  select no, to should we set permissions on outputted files.
  - - select no , to rtl question.
  - - select default (dist/) to question where should we output semantic ui?

  - make sure semantic.json is in root folder (i:e under client)
  - make sure semantic.json base is set as follows:  
  ` "base": "src/semantic"`

  - install gulp globally ( note install version 3.9, <strong>DON'T INSTALL VERSION 4.0</strong>)  
  `npm --save -g install gulp@3.9.0`

  - navigate to src/semantic folder and run following command: `gulp build`

  - above command will created dist directory under client/src/semantic
  - add following line to index.js file  
  `import './semantic/dist/semantic.min.css';`

  - and remove following line from index.js which we added earlier
  `import 'semantic-ui-css/semantic.min.css'`  
  because we want to use the customization file

  - add following two lines in the script in package.json
  `"scripts": {
    "build-semantic": "cd src/semantic && gulp build-css build-assets",
    "watch-semantic": "cd src/semantic && npm run build-semantic && gulp watch",
    ....
    .....`

- now run following command to build and watch for changes:- 
 change to client directory ( <strong>don't need to cd to src/semantic </strong>)  
 `cd client`  
 `npm run watch-semantic`

 ### customization steps
 #### about theme.config
 - navigate to director client/src/semantic/src, and open file theme.config. This file shows all the components in semantic ui, and their values are default. default corresponds to the default theme. So semenantic ui will display component as configured in default theme.
 for eg: `<Button primary>hello</Button>`  
 in theme.config change the value of @button as below  
 `@button: 'material'; `  
 now buttons will be displayed as manterial ui button
 If @button: 'amazon' is made then button will display as orange, because primary for amazon is orange

#### about customization
 - there are three main folders <Strong>definitions,site,themes</Strong> in semantic/src. Each folder has similar structure to semantic-ui, for eg it has collections, elements, modules which contain the same elements as in semantic-ui folder structure. Each folder also has global folder, which contains global variables, which are rerenced in each of the folders.When making changes to components make changes to its corresponding variables file. For eg if want to make changes to checkbox, then make changes to checkbox.variables as explained below:-  
 <strong>1.definitions</strong>: it contains the less files for all the components.   
 For eg open client/src/definition/button.less, and navigate to the section titled Primary , it contains following css for primary:-  
 `.ui.primary.buttons .button,
.ui.primary.button {
  background-color: @primaryColor;
  color: @primaryTextColor;
  text-shadow: @primaryTextShadow;
  background-image: @coloredBackgroundImage;
} `   
`.ui.primary.button {
  box-shadow: @coloredBoxShadow;
}`  
<Strong>2.themes</strong> This folder contains files where all the variables for all themes are defined, since we are using default theme, so we look for @primaryColor  in semantic/src/theme/default/site.variables. If we change @primaryColor to green in site variables, then where ever @primaryColor is defined green color will be used. 
Note @primaryColor is not only defined in defined button.less but also in other places.  
<strong>Note:</Strong>we don't change of @primaryColor in theme/default/site.varialbes.  
<Strong>3.site</strong>: this folder we make changes to the variables.We change it in src/site/globals/site.variable.  
Now open src/site/globals/site.variable ( note the file will be empty, because no customization has been done),and add following line:  
`@primaryColor:green;`  
Now button with primary will appear green. 

#### customizing radio and checkbox
- lets say we want to customize checkbox, so when its checked we want background as blue color and want check as white color.
- first let check what we need to modify, for this open
client/src/semantic/src/definitions/modules/checkbox.less
look for for section title 'Active' and 'Active Focus' and we see the following:  
`/*--------------
     Active
---------------*/`  
`.ui.checkbox input:checked ~ .box:before,
.ui.checkbox input:checked ~ label:before {
  background: @checkboxActiveBackground;
  border-color: @checkboxActiveBorderColor;
}`   
`.ui.checkbox input:checked ~ .box:after,
.ui.checkbox input:checked ~ label:after {
  opacity: @checkboxActiveCheckOpacity;
  color: @checkboxActiveCheckColor;
}`  
`/*--------------
  Active Focus
---------------*/`  
`.ui.checkbox input:not([type=radio]):indeterminate:focus ~ .box:before,
.ui.checkbox input:not([type=radio]):indeterminate:focus ~ label:before,
.ui.checkbox input:checked:focus ~ .box:before,
.ui.checkbox input:checked:focus ~ label:before  {
  background: @checkboxActiveFocusBackground;
  border-color: @checkboxActiveFocusBorderColor;
}`  
`.ui.checkbox input:not([type=radio]):indeterminate:focus ~ .box:after,
.ui.checkbox input:not([type=radio]):indeterminate:focus ~ label:after,
.ui.checkbox input:checked:focus ~ .box:after,
.ui.checkbox input:checked:focus ~ label:after {
  color: @checkboxActiveFocusCheckColor;
}`

From above code we can see that we need to make changes to the value of @checkboxActiveBackground,checkboxActiveBorderColor etc.
These variables are defined in file client/src/semantic/src/theme/default/modules/checkbox.variables.
For eg  
 `@checkboxActiveBackground: @white;`   
` @checkboxActiveBorderColor: @selectedBorderColor;`

if we want to see what is the value of @white we can see in following file:`client/src/semantic/src/themes/default/global/site.variables` where it is defined as below:
`@white  : #FFFFFF;`

Now open corresponding checkbox.varialbes in client/src/semantic/src/site/modules. And add following lines to it

@checkboxActiveBackground: @primaryColor;
@checkboxActiveBorderColor: @primaryColor;
@checkboxActiveCheckColor: @white;
/* Focused Checkbox */
@checkboxActiveFocusBackground: @primaryColorFocus;
@checkboxActiveFocusBorderColor: @primaryColorFocus;
@checkboxActiveFocusCheckColor: @white;
@checkboxTransition: none;

<Strong>Note:</Strong>making above changes will also have effect on radio button, since radio button references some of check box variables, for eg some of them are: 
`@radioFocusBulletColor: @checkboxFocusCheckColor;` 
`@radioActiveBackground: @checkboxActiveBackground;`  
`@radioActiveBulletColor: @checkboxActiveCheckColor;`  
`@radioActiveFocusBackground: @checkboxActiveFocusBackground;`  
`@radioActiveFocusBulletColor: @checkboxActiveFocusCheckColor;` 

### Customizing react application
-  if cursor is on the item and then you click on the item in element panel of developer tools and you check the css it will show the hover style applied also, so remove the hover styles, click on other item then refresh, and click on other item on developer tool, then click on the item in page, then click on item in developer tool. Basically if item in developer tools is highlighted then it will show hover styles, due to which it will appear other styles are not applied.

#### change button and menu background color to same as material
- open button.less and look for section primary, following code is there
`.ui.primary.buttons .button,
.ui.primary.button {
  background-color: @primaryColor;
  color: @primaryTextColor;
  text-shadow: @primaryTextShadow;
  background-image: @coloredBackgroundImage;
}`
`
.ui.primary.buttons .button:hover,
.ui.primary.button:hover {
  background-color: @primaryColorHover;
  color: @primaryTextColor;
  text-shadow: @primaryTextShadow;
}`

- fir change @primaryColor value. In theme/default/global/site.varialbes,
`@primaryColor        : @blue;`
and @blue is defined as 
`@blue             : #2185D0;`
- open site/global/site.variables and define @blue as, also change the default font to Roboto as  
`@fontName          : 'Roboto';`
`@blue             : #2196f3;`

- now we need to change the button hover color, which we can see from button.less it uses following:   
`background-color: @primaryColorHover;`

- in src/theme/default/global/site.variables, @primaryColorHover is defined as  
`@primaryColorHover        : saturate(darken(@primaryColor, 5), 10, relative);`

- open src/site/global/site.variables and define as follows:  
`@primaryColorHover: #1976d2;` 

<Strong>Note:</Strong>We can define the variables in site.variables or button.variables ( in src/site). If we define in site.variables, then it will effect all the components, for eg defining @blue: : #2185D0;, then menu, checkbos, radio etc, will have the blue color. If we define in button.varialbes then only button will the new color. So if we wanted only button to have new blue  color then we can only define @primaryColor: #2196f3, in button variables. But if want all the blue to have new value then we can define @blue in site.variabes, because later in the chain @primaryColor uses @blue.

- when /semantic/dist/semantic.min.css is generated, it contains all the classes, but it has no variabes (@blue) or reference to variables. During generation process variables defined in theme/default/site.variables are used to generate the semantic.min.css. So if we import semantic.min.css we cannot use variables like @blue in our app.  
In order to override the classes for say particular component ( custom component date-picker), we can check the styles applied in dev tools and then override it in our class file.  
for example if we date component in semantic form as a field then in dev tools, we can see applied class to it is `.ui.form input[type=text]`, there will be other classes also but they are not applied .
so if we want to apply our own class we can create  class `errorField`  and use it, then it will override the applied class:    
<pre>
.ui.form input.errorField{
    border: 1px solid red;
    background-color: aqua
}
</pre>

- other option is to use !important in class name, that tell it to override all the rules and apply this class, so if we declare errorField as below , then also it will work:  
<pre>
.errorField{
    border: 1px solid red !important;
    background-color: aqua !important;
</pre>

- following files are modified for react application
   <strong>theme/default/global/site.varialbes </strong>   
   <strong>checkbox.varialbes in client/src/semantic/src/site/modules </strong>

## Semantic form fields
- semantic fields can be defined in 3 ways as follows: 
<pre>
(1)
< Form.Field error={touched && !!error}>
    <label>{label}</label>
  <Input {...props} {...input} type={type} value={input.value} placeholder={placeholder} onChange={handleChange} />
     {touched && ((error && <label className='form_input--errorMessage' ><i>{error}</i></label>))}
  </Form.Field>
  );
< React.Fragment>

(2)
< React.Fragment>
< label style={{display:'inline-block',marginTop:'50px'}}>{label}</label>
  < Form.Input {...props} {...input}  error={touched && !!error}
  value={input.value} 
placeholder={placeholder} 
onChange={handleChange}
  >
< /Form.Input>
  {touched && ((error && <label className='form_input--errorMessage' ><i>{error}</i></label>))}
  < /React.Fragment>
</pre>

- when we define fields for the form, then we need to use `<Form.Field> or <Form.Input>`. If we simply define the field without Form, then Form props will not be passed down to the label and input field. So when there is an error , it will show as black and field may not be highlighted and will not be filled with error color.
Also for input label will be to the left.    
Following the example of defining without Form field:
<pre>
< React.Fragment>
< label style={{display:'inline-block',marginTop:'50px'}}>{label}</label>
  < Input {...props} {...input}  error={touched && !!error}
  value={input.value} 
placeholder={placeholder} 
onChange={handleChange}
  >
< /Input>
  {touched && ((error && <label className='form_input--errorMessage' ><i>{error}<  /i></label>))}
  < /React.Fragment>
</pre>  

- difference between using <Form.Field><Input> versus <Form.Input>. Especially for input and drop list, if we use <Form.Input> it will create 14px bottom margin between its fields, so error message will be 14px below. If we want to it to close to the field, then we have to use css. With <Form.Field><Input>, we can give error message after Input, so error message and input will be enclosed in <Form.Field>, and there will be no margin. Basically when using <Form.Field>, margin is created by <Form.Field>. Same concept is used in DateField.js. However for checkBox it doesn't work because we have label to the right.

#### Semantic modal
- we can provide transition to modal as follows:  
<pre>
 < TransitionablePortal 
    open={this.state.open} 
   transition={ {animation:'fade up', duration:'1500'}}>
   < Modal open <-- see comment on this property below
   onClose={this.onCloseModalHanlder}
   >
   ...
</pre>

- if open is given as `open={this.state.open}` then if will open with transition, but will close immediately without transition, because modal would have immediately closed while transition is taking place.
- so if we want to close the modal immediately then give ` open={this.state.open} `

## CSS General
- you can define variables as follows:
<pre> 
// declare the constant
:root{
  --my-red-color:red
}

// access it as follows
.myClass{
  color:var(--red-color)
}
</pre>
<strong>Note:</strong>variables have to defined with two dashes (--). The :root element is the element who has no parents, anything defined in :root is applied to entire document. The :root is same as :  
<pre>
html{
  
}
</pre>

#### CSS Image
- consider following div:  
<pre>
  < div style={{maxWidth:'100px' height:'120px'}}>
    < img class ='imgClass>
  < /div>
</pre>

- this mean div cannot have width more then 100px,
- also it mean div width can increase or decrease based on its content, but cannot go behyond 100px.<strong>maxWidth allows div's width to increase or decrease. IF we just gave width then it will not increase or decrease</strong>
- consider following imgClass:  
<pre>
.imgClass{
  width:100%
  height:100%
}
</pre>
- if we have image of width =150px and height of 200px, then it will try to take the width of 100px ( since max is 100px), and it will take height corresponding to 100px width of image ( based on aspect ratio) and will go beyong the div vertically. But if image's width was 150px and height was 120px, then it will take width of 100px and then calculate its height , which will be less then 120px, so it will remain in the div.

- so resolve the above situation, let change the imgClass as follows: 
<pre>
 width:100%
 maxHeight:120px
</pre>
Now image will remain within div, but will be crooked, i:e it will not be proportional. Image will try to take the max width of container of 100px ( if image width is more then 100px), and it height will be up to 120px. So image of width 150 and height of 200, will take the width of 100 and height of 120 ( even thought it proportional height is more then 120), which will make it crooked.Similary even if we do maxHeight:100%, same thing will happen.

- lets change the imgClass as follows: 
<pre>
maxWidth: '100%'
maxHeight: '100%',
</pre>
same think as in previous cases. 
- the issue we are having in above cases is image is trying to take 100px width then it calculates it height, and if height is more the 120, it tries to confine its height within 120px, which makes it crooked.
- so how about we set the width to auto as below:
<pre>
width: 'auto'
maxHeight: '120px',
</pre>
now if image's width is less then 100,but height is more then 150px, then it will work fine, because its height will adjust ( since we have maxHeight), it will try to take the width upto 100 and calculate it height, and only take the height for which its width is within 100.
But if image width=150 and height=100, then it will try to take width of 150,which will make it go beyong the div.

- So how about we set the maxHeight to 120px, as below: 
<pre>
 maxWidth: '100%'
maxHeight: '120px',

</pre>
Now image will try to take width of 100px and calcualte it height , and if its height is more then 120px, then it will reduce its with so it can come within 120px. which will make it within div and also no crooked.