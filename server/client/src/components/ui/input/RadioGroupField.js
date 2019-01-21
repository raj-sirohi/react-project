
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel';
import Logger from '../../../loggingUtil/logger';

const styles = theme => ({
    radioGroupRoot: {
        marginTop:'6px'  // total we need is 12 px, other 6px comes from formLabel
    },

    group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
});
class RadioGroupField extends Component {

    logger = Logger('RadioGroupField');

    renderFromHelper = () => {
        const {  classes, input,
            label,
            meta: { touched, error },
            children,
            ...custom } = this.props
            if (!(touched && error)) {
                return
              } else {
                return <FormHelperText style={{marginTop:"0",marginLeft:"-10px" }}>{touched && error}</FormHelperText>
              }
            }
    render() {
        this.logger.log('this.props', this.props);
        const { input, value, required, label,color = "primary",vertical=false, onChange, meta: { touched, error },classes,...rest } = this.props
         const orientationClass = vertical?classes.group:'';
         const displayErrorState = touched && !!error;
        return (
            <FormControl variant="outlined" error={displayErrorState}>
            <FormLabel required ={required} component="legend">{label}</FormLabel>
            <RadioGroup
            {...input}
            {...rest}
            className={orientationClass}
            defaultChecked='female'
           // valueselected={input.value}
             color={color}
             classes={{root:classes.radioGroupRoot}}
            onChange={(event, value) => input.onChange(value)}
          />
           {this.renderFromHelper()}
            </FormControl>
        )
    }
}

RadioGroupField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioGroupField);
