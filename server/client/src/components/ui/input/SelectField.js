
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import ReactDOM from 'react-dom';

import Logger from '../../../loggingUtil/logger';

const styles = theme => ({
   
      rootLabel: {
      //  color : 'green',
         transform: 'translate(14px, 12px) scale(1)',
         
      },
   
   

      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
          //borderRadius:0
         
        }
      },
    
      cssFocused: {},
    
      notchedOutline: {
      //  borderWidth: '1px',
        // borderColor: 'green !important',
       // borderRadius:0
      },

    
});
class SelectField extends Component {

    logger = Logger('SelectField');

    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
      };
    
      componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
      renderFromHelper = ({ touched, error }) => {
        if (!(touched && error)) {
          return
        } else {
          return <FormHelperText style={{marginTop:"4px",marginLeft:"0px" }}>{touched && error}</FormHelperText>
        }
      }
    
    render() {
        //this.logger.log('this.props', this.props);
        const {  classes, input,
            label,
            name,
            required,
            fullWidth=false,
            width,
            meta: { touched, error },
            children,
            ...custom } = this.props

            const style ={width}
            const displayErrorState = touched && !!error;

        return (
          
             <FormControl required={required} fullWidth={fullWidth} width="2000px" style={{marginTop:'16px',...style}} variant="outlined" error={displayErrorState}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
            classes={{
                    root: classes.rootLabel,
                    focused: classes.cssFocused
            }}
          >
          {label}
          </InputLabel>
          <Select
            native
            {...input}
            {...custom}
            style={{height:'40px'}}
            
            input={
                <OutlinedInput
                  name={name}
                  classes={{
                    root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
                }}
                  labelWidth={this.state.labelWidth}
                  id="outlined-age-native-simple"

               
                />
              }

    
             
           
          >
            {children}
          </Select>
          {this.renderFromHelper({ touched, error })}
        </FormControl>
        )
    }
}

SelectField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectField);
