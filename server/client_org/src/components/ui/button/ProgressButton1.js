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
        margin: '5px', //theme.spacing.unit, - // default distance between buttons
        position: 'relative',

    },
    buttonProgress: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
});


const RemoteSubmitButton = ( {actionSubmit=true, render=true,color,variant,
    clickAction,processing,disabled,classes,children,formName, icon,dispatch }) => {

const disabledColor = (color==='primary'? "#BBDEFB":'#FFCDD2');
//const display = (render?false)
    const renderIcon = () => {
        if (!!icon) {
            return <Icon style={{ marginRight: '0px' }}>{icon}</Icon>
        }
    } 

    return(
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    color={color}

                    variant={variant}
                    classes={{
                        root: classes.root
                    }}

                    style={{ display:render?'':'none',  textTransform: 'uppercase',backgroundColor: disabled ? disabledColor : ''}}
                    disabled={disabled}
                    onClick={actionSubmit ? () => dispatch(submit(formName)) : clickAction}>
                   {renderIcon()}{children}</Button>
                {processing && <CircularProgress size={24} thickness={5} className={classes.buttonProgress}/>}
            </div>
        </div>

    )

}

RemoteSubmitButton.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect()(withStyles(styles)(RemoteSubmitButton))
