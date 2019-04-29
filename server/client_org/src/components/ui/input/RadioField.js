
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Logger from '../../../loggingUtil/logger';

const styles = theme => ({
    checkBoxRoot: {
        padding: '12px 0 12px 12px'
    }
});
class RadioField extends Component {

    logger = Logger('RadioField');
    render() {
        this.logger.log('this.props', this.props);
        const { input, value, label,color = "primary", onChange, classes,...rest } = this.props

        return (
          
            <FormControlLabel    value={value} label={label} {...input} control={<Radio {...input}  />}  />
        )
    }
}

RadioField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioField);
