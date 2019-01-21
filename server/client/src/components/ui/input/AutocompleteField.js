import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Logger from '../../../loggingUtil/logger';

const logger = Logger('AutocompleteField');


const styles = theme => ({
  textField: {
    height: 40,        // for autocomplete, text field and react-select should be same
    // text field is displayed from react-select
    marginTop: '15px'
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  rootLabel: {
    transform: 'translate(14px, 12px) scale(1)',
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.secondary} !important`,
    }
  },
  cssFocused: {
  },

  notchedOutline: {
  },
});

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
 // logger.log('Control props', props);

  const shrinkVal = (props.isFocused || props.selectProps.value) ? true : false
  const label = (props.isFocused || props.selectProps.value) ? props.selectProps.label : props.selectProps.label

  const displayErrorState = props.selectProps.touched && !!props.selectProps.error;
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      required={props.selectProps.required}
      error={displayErrorState}
      placeholder='rajesh placeholder'
      className={props.selectProps.classes.textField}
      // {...props.selectProps.textFieldProps}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
          // classes: {
          //   root: props.selectProps.classes.cssOutlinedInput,
          //   focused: props.selectProps.classes.cssFocused,
          //   notchedOutline: props.selectProps.classes.notchedOutline,
          // },
        },
      }
      }
      InputLabelProps={{
        classes: {
          root: props.selectProps.classes.rootLabel,
          focused: props.selectProps.classes.cssFocused
        },
        shrink: shrinkVal
      }}
    />
  );
}

const components = {
  Control
};

class AutocompleteField extends React.Component {

  render() {
    logger.log('this.props', this.props);
    const { classes, theme, options, meta: { touched, error } } = this.props;

    const customStyles = {
      input: styles => {
        return {
          ...styles,
          height: '40px',
        };
      }
    }
    return (
      <div >
        <Select
          classes={classes}  // pass classes to textfield which is the component displaying this field
          label={this.props.label}
          required={this.props.required}
          touched={touched}
          error={error}
          options={options}
          styles={customStyles}
          components={components} // pass the component which will display this field
          value={this.props.input.value} // value={this.state.single}
          onChange={(value) => this.props.input.onChange(value)} //onChange={this.handleChange('single')}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
          placeholder=''
          isClearable
        />
      </div>
    );
  }
}

AutocompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AutocompleteField);
