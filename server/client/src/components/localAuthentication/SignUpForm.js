import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import { reduxForm, Field, getFormSubmitErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FormInput from '../ui/form/FormInput'

import { createUser, getUserById, uploadFile, getImage } from '../../store/actions/authActions' // '../../actions/index';
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
import ImageDropField3 from './ImageDropField3';
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
import * as fs from 'fs';
import Logger from '../../loggingUtil/logger';
import ReactPlayer from 'react-player'
import VideoThumbnail from 'react-video-thumbnail';

import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef,
    image64CroppedtoCanvasRef
} from './ResuableUtils';

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
        age: '',
        imageData: ''
    };

    componentDidMount() {
        this.getImageData('/images/a.jpeg');

    }

    // working 
    getImageData11 = async (imageUrl) => {
        const imageData = await this.props.getImage('/images/a.jpeg');
        // this.setState({imageData:'data:image/jpeg;base64,'+imageData.data})
        //const preview = URL.createObjectURL(imageData.data)
        this.setState({ imageData: imageData.data })
        // this.logger.log('getImageData imageData.data', imageData.data);
        // this.saveImage('ttt',imageData.data)
    }

    b64toBlob = (dataURI) => {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    getImageData = async (imageUrl) => {

        const imageData = await this.props.getImage('/images/a.jpeg');
        // const imageData = "data:image/jpg;base64,"+imageData1;
        //logger.log('imageData',imageData);
        const a = imageData.data;
        // logger.log('datauri split',a.split(',')[0].indexOf('base64'));
        const byteString = atob(a.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        const blob = this.dataURItoBlob(a)
        const preview = URL.createObjectURL(blob)
        this.setState({ imageData: preview })
        // this.logger.log('getImageData imageData.data', imageData.data);
        // this.saveImage('ttt',imageData.data)
    }

    dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        // atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    b64toBlobA = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
        return blob;
    }

    saveImage = (filename, data) => {
        var myBuffer = new Buffer(data.length);
        for (var i = 0; i < data.length; i++) {
            myBuffer[i] = data[i];
        }
        fs.writeFile('/test.jpeg', 'aaaa', function (err) {
            if (err) {
                this.logger.log(err);
            } else {
                this.logger.log("The file was saved!");
            }
        });
    }

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
                        savedFiles
                        component={ImageDropField3}
                        label='ImageDropField3'
                        name='ImageDropField3'

                        placeholder="your first name" />
                </Grid>
                <img src={this.state.imageData} alt="Image preview..." />
                <img src="/api/images/b.jpeg" alt="Image preview..." />

                <Grid item xs={12}>
                    <ReactPlayer
                        url="/api/videos/SampleVideo_1280x720_20mb.mp4" controls light={this.state.imageData} />
                </Grid>
                <VideoThumbnail
                    videoUrl="/api/videos/SampleVideo_1280x720_20mb.mp4"
                    thumbnailHandler={(thumbnail) => this.logger.log('videoThumbnail data')}
                    width={120}
                    height={80}
                />

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
        getCountryListByName: (inputVal) => dispatch(Actions.getCountryListByName(inputVal)),
        getImage: (imageUrl) => dispatch(getImage(imageUrl))

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
            formatMask: '123477777',
            asyncountry: { label: 'Canada', value: 'can' },
            ImageDropField3: ['/images/a.jpeg', '/images/b.jpeg']
            //   dob: '2012-07-11'
        }


    }
}
const logger = Logger('SignUpForm')
const onSubmit = (values, dispatch, props) => {
    logger.log('ON SUBMIT VALUES ', values);
    dispatch(uploadFile(values))
    // if (props.userId) {
    //     dispatch(actions.updateUser(props.userId, values))
    // } else {
    //     dispatch(uploadFile(values))
    // }
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
    logger.log('values.asyncountry,', !(!!values.asyncountry));
    if (!(!!values.asyncountry)) {
        errors.asyncountry = 'country is required!'
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






