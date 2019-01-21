import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
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

class ProgressButton extends React.Component {
    state = {
        loading: false
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {

                    loading: true
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false

                        });
                    }, 2000);
                },
            );
        }
    };

    timer = undefined;

    render() {
        const { loading, success } = this.state;
        const { classes } = this.props;


        return (
            <div className={classes.root}>

                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"

                        disabled={this.props.processing}

                        onClick={this.props.onClickAction}>
                        {this.props.children}
                    </Button>
                    {this.props.processing && <CircularProgress size={24} thickness={5}  className={classes.buttonProgress} />}
                </div>
            </div>
        );
    }
}

ProgressButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressButton);