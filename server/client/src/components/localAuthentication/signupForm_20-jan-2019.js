import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FormInput from '../ui/form/FormInput'

import { createUser, getUserById } from '../../store/actions/authActions' // '../../actions/index';
import * as actions from '../../store/actions/authActions'
import * as Actions from '../../store/actions/countryActions'

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
import ImageDropField from './ImageDropField';
import ImageDropField2 from './ImageDropField2';
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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import AutocompleteField from '../ui/input/AutocompleteField'
import AsynAutocompleteField from '../ui/input/AsynAutocompleteField'
import FormatMaskField from '../ui/input/FormatMaskField'

import PhoneField from '../ui/input/PhoneField'

import axios from '../../config/axios/axiosBlog';
import Dropzone from 'react-dropzone'
import Logger from '../../loggingUtil/logger';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: '50%',
    },
    textField: {

        height: 30
    },
    formRadioLabel: {
        padding: '3px 10px 3px 3px'

    },

    radioRoot: {
        padding: 0 //'12px 5px 0px 5px' - 0 also removed ripple effect, more padding more ripple effect
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

    // for card
    card: {
        width: '80%',
        margin: '0 auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    message: {
        fontSize: 14,
        // marginBottom:0
    },
    pos: {
        marginBottom: 12,
    },
    cardContent: {
        paddingBottom: 0
    }

});

class SignUpForm extends Component {
    constructor(props) {
        super(props);
       
      }
    logger = Logger('SignUpForm');

    state = {
        age: ''
    };

   

    renderContent() {
        const { classes } = this.props;

        return (

            <Grid container>
                <Grid item xs={12}>
                    <Field
                        component={InputField}
                        type="text"
                        label='Id'
                        name='_id'
                        fullWidth
                        width='60%'
                        disabled
                    />
                </Grid>
                <Grid item xs={3}>
                    <Field
                        width='90%'
                        placeholder='your gender'
                        name="gender"
                        component={SelectField}
                        label="Gender"
                    >
                        <option value="" />
                        <option value={'M'}>Male </option>
                        <option value={'F'}>Female</option>
                        <option value={'O'}>Other</option>
                    </Field>
                </Grid>
                <Grid item xs={3}>
                    <Field
                        width='90%'
                        required
                        component={InputField}
                        label='Last Name'
                        name='lastName'
                        placeholder="your last name" />
                </Grid>


                <Grid item xs={3}>
                    <Field
                        width='90%'
                        required
                        component={InputField}
                        label='First Name'
                        name='firsrName'

                        placeholder="your first name" />
                </Grid>

                <Grid item xs={12} />

               
                <Grid item xs={12} />
            

                 <Grid item xs={12}>
                    <Field
                        width='100%'
                        required
                        component={ImageDropField2}
                        label='ImageDropField2'
                        name='ImageDropField2'

                        placeholder="your first name" />
                </Grid>
              


            </Grid>


        )
    }

    renderError = () => {
        const { classes } = this.props;
        if (this.props.submitFailed) {
            return (
                <Typography className={classes.message} color="secondary" >
                    <Icon style={{ verticalAlign: 'middle' }} >error</Icon>Form has errors
        </Typography>
            )
        } else {
            return;
        }
    }

   
   
    render() {
        const { handleSubmit, userId, classes } = this.props;
        // this.props contains lot of values which are injected by redux form, such as submitFailed
        console.log('signup form render this.props.submitFailed', this.props.submitFailed);
        const renderError = ({ input, meta, ...props }) => (

            <span >Error : {meta.error}</span>
        )



        const contactId = "raj"
        return (
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent style={{ paddingBottom: '0px' }} classes={{ root: classes.cardContent }}>
                        <Typography className={classes.title} color="primary" >
                            SignUp
                        </Typography>
                        <Typography className={classes.message} color="textSecondary" >
                            Fields marked with * are required
                        </Typography>
                        {this.renderError()}
                    </CardContent>

                    <CardContent style={{ paddingBottom: '0px' }} classes={{ root: classes.cardContent }}>
                        {this.renderContent()}
                    </CardContent>
                    {/* <CardContent style={{ padding: '0px' }} >
                        <Divider style={{ marginTop: '20px' }} />
                    </CardContent> */}

                    <CardActions >
                        <ProgressButton1 color="primary"
                            formName='initializeFromState'
                            disabled={this.props.processing}
                            processing={this.props.processing}
                        >
                            {userId ? 'update' : 'submit'}
                        </ProgressButton1>

                        <ProgressButton1 color='secondary'
                            formName='initializeFromState'
                            disabled={this.props.processing}
                            processing={this.props.submitting}

                            actionSubmit={false}
                            clickAction={this.props.reset}>
                            reset
                        </ProgressButton1>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //  createUser: (user, history) => dispatch(createUser(user, history)),
        //  createUser: (dispatch) => createUser(dispatch),
        getUserById: (userId) => dispatch(getUserById(userId)),
        getCountryListByName: (inputVal) => dispatch(Actions.getCountryListByName(inputVal))

    }
}

const mapStateToProps = state => {

    return {
        user: state.auth.user,
        userId: state.auth.user ? state.auth.user._id : '',
        processing: state.auth.processing,
        token: state.auth.token,
        countryList: state.country.countryList,
        // initialValues: state.auth.user 
        initialValues: {
            lastName: 'rajesh',
            formatMask:'123477777',
            asyncountry:{label:'Canada',value:'can'},
          //   dob: '2012-07-11'
        }


    }
}
const logger = Logger('SignUpForm')
const onSubmit = (values, dispatch, props) => {
    logger.log('ON SUBMIT VALUES ', values);

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

    if (!values.favoriteColor) {
        errors.favoriteColor = 'Required'
    }

    
    if (values.gender == undefined) {
        errors.gender = "gender is required"
    }

    if (values.sex == undefined) {
        errors.sex = "sex is required"
    }

    if (values.sex1 == undefined) {
        errors.sex1 = "sex1 is required"
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    logger.log('values.asyncountry,',!(!!values.asyncountry));
    if (!(!!values.asyncountry)){
        errors.asyncountry='country is required!'
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

