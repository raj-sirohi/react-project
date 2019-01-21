import React, { Component } from 'react';
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FormInput from '../ui/form/FormInput'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import { createUser, getUserById } from '../../store/actions/authActions' // '../../actions/index';
import * as actions from '../../store/actions/authActions'

import { FormBody, FormButtonPanel, FormContainer, FormHeader } from "../ui/form/Index";
import ProgressButton from "../ui/button/ProgressButton";
import ProgressButton1 from "../ui/button/ProgressButton1";
import submit from "./submit";
import TextField from '@material-ui/core/TextField';

import Checkbox from '@material-ui/core/Checkbox'

import MenuItem from '@material-ui/core/MenuItem'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Logger from '../../loggingUtil/logger';

const styles = theme => ({

    textField: {

        height: 30
    },

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
        value: 'male',
        checkedA: true
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.logger.log('handleChange event.target.value:', event.target.value);
    };

    handleChange2 = name => event => {
        this.logger.log('handleChange2 event.target.checked:', event.target.checked);
        this.setState({ [name]: event.target.checked });
    };

    componentDidUpdate() {

    }

    renderCheckbox1 = ({ input, label, ...custom }) => (
        <Checkbox
       
        checked={this.state.checkedA}
        onChange={this.handleChange2('checkedA')}
        {...custom}
        {...input}
        value="checkedA"
        />
    )

    renderCheckbox = ({ input, value,label, ...custom }) => (
        <Checkbox
            label={label}
           
            //defaultChecked={input.value ? true : false}
            defaultChecked={true}
            checked={input.value ? true : false}
            {...custom}
            {...input}
            value='test'
        />
    );

    renderRadioGroup1 = ({ input, ...rest }) => (
        <RadioGroup
            {...input}
            {...rest}
            value={this.state.value}
            onChange={this.handleChange}
        />
    )

    renderRadioGroup = ({ input, ...rest }) => (
        <RadioGroup
            {...input}
            {...rest}
            value={input.value}
           
        />
    )



    renderContent() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Grid container>
                    <Grid item xs={4}>
                        <Field
                            component={TextField}
                          //  type="date"
                            label='Id'
                            name='_id'
                            width='300'
                            margin="normal"
                            
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                                shrink: true
                            }}

                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>

                        <Field name="employed" value='test' component={this.renderCheckbox} label="Employed" />
                    </Grid>
                    <Grid item xs={4}>
                        <Field name="sex"  component={this.renderRadioGroup}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </Field>
                    </Grid>
                    <Grid item xs={4}>
                        <Field

                            type="text"
                            component={FormInput}
                            label='Last Name'
                            name='lastName'
                            placeholder="your last name" />
                    </Grid>
                   

                    <Grid item xs={4}>
                        <TextField
                            id="date"
                            label="txt Birthday dense"
                            margin='dense'
                            variant="outlined"


                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="date"
                            label="txt Birthday"
                            margin='normal'
                            variant="outlined"


                        />
                    </Grid>

                     <Grid item xs={4}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}


                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}

                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}

                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Field

                            component={FormInput}
                            type="text"
                            label='Email'
                            name='email'
                        />
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
        initialValues: state.auth.user

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
        initialValues: { lastName: 'rajesh' },
        onSubmit

    })
)(withStyles(styles)(SignUpForm));

