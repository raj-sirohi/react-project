import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '&$disabled': {
            backgroundColor:'#BBDEFB'
        },
    },

    disabled:{},
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});


const RemoteSubmitButton = ( {actionSubmit=true, color,variant,clickAction,processing,disabled,classes,children,formName, icon,dispatch }) => {


    //const disabledBackgroundColor= variant=='primary'?   '#BBDEFB':'';
    const styles1 = theme => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            '&$disabled': {
                backgroundColor:'red'
            },
        },

        disabled:{},
        wrapper: {
            margin: theme.spacing.unit,
            position: 'relative',
        },
        buttonProgress: {

            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    });


    //  const {actionSubmit=true, color,variant,clickAction,processing,disabled,classes,children,formName, icon,dispatch }=props;
    return(
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    color={color}
                    variant={variant}
                    classes={{
                        root: classes.root,
                        disabled: classes.disabled
                    }}
                    disabled={disabled}
                    onClick={actionSubmit ? () => dispatch(submit(formName)) : clickAction}>
                    <Icon style={{marginRight: '5px'}}>{icon}</Icon>{children}</Button>
                {processing && <CircularProgress size={24} thickness={5} className={classes.buttonProgress}/>}
            </div>
        </div>

    )
    // const Styled = connect()(withStyles(styles)(div));


    /*
        return (
            <Styled>{children}</Styled>
        );*/





}

RemoteSubmitButton.propTypes = {
    classes: PropTypes.object.isRequired,
};



//export efault RemoteSubmitButton

export default connect()(withStyles(styles)(RemoteSubmitButton))
