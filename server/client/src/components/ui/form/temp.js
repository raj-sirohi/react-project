import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


/*const theme = createMuiTheme({
    palette: {

        primary: {
            main:'#2196F3'
        },
        secondary:{
            main:'#F44336'
        }
    },
    overrides: {
        MuiFormHelperText: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
                color: 'green', // Some CSS
            },
        },

        MuiFormLabel:{
            root:{

                //   fontSize: 30,
              //  color:'red',
                marginBottom:'700px'
            }

        },
        MuiFormControlLabel:{
            root:{

                //   fontSize: 30,
             //   color:'red',
                marginBottom:'700px'
            }

        },

        MuiFormControl:{
            root:{

                //   fontSize: 30,
               // color:'red',
                marginBottom:'20px'
            }
        },

MuiInputLabel:{
            root:{

             //   fontSize: 30,
            //    color:'red',
                //marginBottom:'100px'
            }

},

        MuiInput:{
            root:{

                //  fontSize: 22
              //  color:'red'

            }

        }
    }
});*/
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 300,
      //  margin: 100,
    //  height :30
       
    },
    //style for font size
    resize1:{
      fontSize:10
    },

    formTextLabel:{
        fontSize:20
       
    },
    formHelperText:{
        fontSize:10
    }
    }

const formInput= ({id,disabled=false,width,classes, type='text',input,multiline=false,placeholder='',
rows=0, rowsMax=0, label, meta: { error, touched } }) => {
    console.log('forminput label',label);
    console.log('forminput error',error);
console.log('forminput touched',touched);
const displayErrorState = touched && !!error;
const a = type =='date'?    <InputLabel shrink={true}  required={true} htmlFor={id}>{label}</InputLabel>:   <InputLabel  required={true} htmlFor={id}>{label}</InputLabel>
    return (
        <div>
             
             <TextField {...input} 
          id={id}
          label={label}
          type={type}
          error ={displayErrorState}
          multiline={multiline} 
          rowsMax={rowsMax} 
          rows={rows} 
          style={{width}} 
          placeholder={placeholder} 
         
          margin="normal"
          variant="outlined"
         helperText='this is error'
          InputProps={{
            classes: {
              input: classes.resize1,
            },
          }}

          InputLabelProps={{
            classes: {
              root: classes.formTextLabel
            }
          }}

          FormHelperTextProps={{
            classes: {
              root: classes.formHelperText
            }
          }}
           className={classes.textField}

           style ={{height:'40px'}}
         
        />
               
                     
                 
               

        </div>

// helperText={displayErrorState?error:''}
   /* return (
       <div>
           <MuiThemeProvider theme={theme}>
               <FormControl >
                   <InputLabel  required={true} htmlFor="name-helper">{label}</InputLabel>
                   <Input {...input}   id="name-helper" />
                   <FormHelperText id="name-helper-text">Some important helper text</FormHelperText>
               </FormControl>

           </MuiThemeProvider>
       </div>*/








    );
};



/*
const styles = {
    button: {


        color: 'green',
        marginTop:0
    }
};

formInput.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(formInput);*/

formInput.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(formInput);

//export default formInput
