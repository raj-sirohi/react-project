import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FormInput from '../ui/form/FormInput'

import { createUser, getUserById } from '../../store/actions/authActions' // '../../actions/index';
import * as actions from '../../store/actions/authActions'

import { FormBody, FormButtonPanel, FormContainer, FormHeader } from "../ui/form/Index";
import ProgressButton1 from "../ui/button/ProgressButton1";
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputField from '../ui/input/InputField';
import DateField from '../ui/input/DateField';
import CheckBoxField from '../ui/input/CheckBoxField';
import RadioGroupField from '../ui/input/RadioGroupField';
import SelectField from '../ui/input/SelectField';
import TextBoxField from '../ui/input/TextBoxField'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import Select from '@material-ui/core/Select';
import RadioField from '../ui/input/RadioField';
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Logger from '../../loggingUtil/logger';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    textField: {

        height: 30
    },
    formRadioLabel: {
        padding: '3px 10px 3px 3px'

    },

    radioRoot: {
        padding: 0 //'12px 5px 0px 5px'
    },
    radio: {
        '&$checked': {
            color: '#2196F3'
        },
        padding: '5px 5px 5px 5px'
    },
    checked: {},

    cssLabel: {
        color: 'green',
        transform: 'translate(14px, 6px) scale(1)'
    },

    resize: {
        fontSize: 10,
        height: '20px',

    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
        }
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'green !important'
    },

});

class SignUpForm extends Component {

    logger = Logger('SignUpForm');

    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
      };
    
    //   componentDidMount() {
    //     this.setState({
    //       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    //     });
    //   }

    radioHandleChange = event => {
        this.setState({ value: event.target.value });
        this.logger.log('handleChange event.target.value:', event.target.value);
    };

    checkBoxhandleChange = name => event => {
        this.logger.log('handleChange2 event.target.checked:', event.target.checked);
        this.setState({ [name]: event.target.checked });
    };

    componentDidUpdate() {

    }

    renderRadioGroup = ({ input, ...rest }) => (
        <RadioGroup
            {...input}
            {...rest}
            valueselected={input.value}
            onChange={(event, value) => input.onChange(value)}
        />
    )

    renderRadioGroup1 = ({ value, input, ...rest }) => (
        <RadioGroup
            {...input}
            {...rest}
            value={value}
        // onChange={this.radioHandleChange}
        />
    )

    renderFromHelper = ({ touched, error }) => {
        if (!(touched && error)) {
          return
        } else {
          return <FormHelperText>{touched && error}</FormHelperText>
        }
      }
      
      renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
      }) => (
        <FormControl variant="outlined" error={touched && error}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Age
          </InputLabel>
          <Select
            native
            {...input}
            {...custom}
            input={
                <OutlinedInput
                  name="age"
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

    renderContent() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
  <Card >
  <CardContent>
            <Grid container>
                <Grid item xs={4}>
                    <Field
                        component={InputField}
                        type="text"
                        label='Id'
                        name='_id'
                        width='300'
                        disabled
                    />
                </Grid>
                <Grid item xs={4}>
                    <Field
                        type="text"
                        component={InputField}
                        label='Last Name'
                        name='lastName'
                        placeholder="your last name" />
                </Grid>

                <Grid item xs={4}>
                    <Field
                        component={DateField}
                        label='Date of Birth'
                        name='dob'
                    />
                </Grid>

                <Grid item xs={3}>
                    <Field
                        component={CheckBoxField}

                        label='field Gender'
                        name='gender'
                        defaultChecked={true}
                    //onChange={this.checkBoxhandleChange('checkedA')}
                    />

                </Grid>

                <Grid item xs={3}>
                    <Field name="sex" value='male' rajroperty='test' component={RadioGroupField}>
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="female"
                            control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Female" />
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="male" control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Male" />
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="other" control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Other" />
                    </Field>

                </Grid>

                <Grid item xs={3}>
                    <Field name="sex1" vertical value='male' rajroperty='test' component={RadioGroupField}>
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="female"
                            control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Female" />
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="male" control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Male" />
                        <FormControlLabel color='default' classes={{ root: classes.formRadioLabel }} value="other" control={<Radio color='default' classes={{ root: classes.radioRoot }} icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />} />} label="Other" />
                    </Field>

                </Grid>

                {/* <Grid item xs={6}>
                    <Field
                       
                        name="favoriteColor"
                        component={this.renderSelectField}
                        label="Favorite Color"
                    >
                        <option value="" />
                        <option value={'ff0000'}>Red </option>
                        <option value={'00ff00'}>Green</option>
                        <option value={'0000ff'}>Blue</option>
                    </Field>
                </Grid> */}

                  <Grid item xs={6}>
                    <Field
                       
                        name="favoriteColor"
                        component={SelectField}
                        label="Favorite Color"
                    >
                        <option value="" />
                        <option value={'ff0000'}>Red </option>
                        <option value={'00ff00'}>Green</option>
                        <option value={'0000ff'}>Blue</option>
                    </Field>
                </Grid>

                 <Grid item xs={12}>
                    <Field
                        type="text"
                        component={TextBoxField}
                        label='Notes'
                        name='notes'
                        width ='100%'
                        multiline
                        required
                        row='4'
                        rowsMax='2'

                        placeholder="your last name" />
                </Grid>

            </Grid>
            <Field

                component={FormInput}
                type="password"
                label='password'
                name='password'
            />



            <Field

                component={FormInput}
                type="text"
                label='idType'
                name='idType'
            />

 </CardContent>
      
    </Card>
        </div>
    )
}


render() {
    const { handleSubmit, userId } = this.props;
    // this.props contains lot of values which are injected by redux form, such as submitFailed
    console.log('signup form render this.props.submitFailed', this.props.submitFailed);
    const renderError = ({ input, meta, ...props }) => (

        <span >Error : {meta.error}</span>
    )


    const contactId = "raj"
    return (
        <FormContainer>

            <FormHeader submitFailed={this.props.submitFailed} title="Sign Up" text="Please enter the values" />



            <form onSubmit={handleSubmit}>


                <FormBody>
                    {this.renderContent()}
                    <Field name='lastName' component={renderError} />

                </FormBody>

                {/* icon='person_add' */}
                {/* icon='loop' */}
                <FormButtonPanel>



                    <ProgressButton1 color="primary"
                        formName='initializeFromState'
                        disabled={this.props.processing}
                        processing={this.props.processing}
                        icon='person_add'>
                        {userId ? 'update' : 'submit'}
                    </ProgressButton1>

                    <ProgressButton1 color='secondary'
                        formName='initializeFromState'
                        disabled={this.props.processing}
                        processing={this.props.submitting}
                        icon='loop'
                        actionSubmit={false}
                        clickAction={this.props.reset}>
                        reset
                        </ProgressButton1>
                </FormButtonPanel>

            </form>
        </FormContainer>

    )
}
}

const mapDispatchToProps = dispatch => {
    return {
        //  createUser: (user, history) => dispatch(createUser(user, history)),
        //  createUser: (dispatch) => createUser(dispatch),
        getUserById: (userId) => dispatch(getUserById(userId))

    }
}

const mapStateToProps = state => {

    return {
        user: state.auth.user,
        userId: state.auth.user ? state.auth.user._id : '',
        processing: state.auth.processing,
        token: state.auth.token,
        // initialValues: state.auth.user 
        initialValues: {
            lastName: 'rajesh',
            dob: '2012-07-11'
        }


    }
}

const onSubmit = (values, dispatch, props) => {
    console.log('ON SUBMIT values ', values);

    if (props.userId) {
        dispatch(actions.updateUser(props.userId, values))
    } else {
        dispatch(createUser(values))
    }
    // your submit action //      );
};

const validate = (values) => {
    const errors = {}
    if (!values.lastName) {
        errors.lastName = 'Required'
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Must be 2 characters or less'
    }

    if (!values.favoriteColor){
        errors.favoriteColor='Required'
    }

    console.log(' Validate ***** gender', values.gender)
    if (values.gender==undefined){
        errors.gender="gender is required"
    }

    if (values.sex==undefined){
        errors.sex="sex is required"
    }

    if (values.sex1==undefined){
        errors.sex1="sex1 is required"
    }




    return errors;
}

//export default connect(mapStateToProps,mapDispatchToProps)(InitializeFromStateForm);

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        validate,
        form: 'initializeFromState',
        enableReinitialize: true,
        destroyOnUnmount: false,

        onSubmit

    })
)(withStyles(styles)(SignUpForm));

