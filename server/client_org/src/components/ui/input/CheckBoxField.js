
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'

const styles = theme => ({
    checkBoxRoot: {
        padding: '12px 0 12px 12px'
    }
});
class CheckBoxField extends Component {

    renderFromHelper = () => {
        const {  classes, input,
            label,
            meta: { touched, error },
            children,
            ...custom } = this.props
            if (!(touched && error)) {
                return
              } else {
                return <FormHelperText style={{marginTop:"-10px",marginLeft:"0px" }}>{touched && error}</FormHelperText>
              }
            }
    render() {
        const { input, label, defaultChecked = false, color = "default", onChange,  meta: { touched, error },classes } = this.props
        const displayErrorState = touched && !!error;
        return (
         
            <FormControl  variant="outlined" error={displayErrorState}>
            <FormControlLabel 
                control={
                    <Checkbox
                       // defaultChecked={defaultChecked} -- default checked and checked cannot be used together
                       // if we are setting the initial values in redox form like employed:true, then checked will
                       // be used to display checked. if we want to set the default value when creating the
                       //form then use defaultChecked
                        // checked={checked} -- this will set the check box to true,
                        // if checked if true, so if using this need to change the value of checked
                        // using on change
                        onChange={onChange}
                        checked={input.value ? true : false}
                        {...input}
                        value="checkedA"
                        // className={classes.checkBoxRoot} -- this will also work
                        classes={{
                            root: classes.checkBoxRoot
                        }}
                        
                        color={color}
                       
                    />
                }
                label={label}
            />
            {this.renderFromHelper()}
            </FormControl>
           
        )
    }
}

CheckBoxField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckBoxField);
