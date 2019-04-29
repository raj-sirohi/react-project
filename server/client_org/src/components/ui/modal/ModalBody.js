import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import "./modal.css";

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: '360px',
      backgroundColor: theme.palette.background.paper,
    },
  });

const modalBody = (props)=>{
    const { classes } = props;
    return(
      
        <div className="modalBody">

            {props.children}
            <Divider/>
        </div>
    )
}
modalBody.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(modalBody);