import React from "react";
import "./Form.css";
import { reduxForm, Field } from 'redux-form';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';


const formHeader =(props)=>{
    console.log('formHeader props',props);
    return (

        <div className="formHeaderOuter">
         <div className="formHeaderInner">
        
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            {props.error&& <div className='formError'><p >{props.error}</p></div>}
            {props.submitFailed &&  <div className='formError'><p ><Icon style={{verticalAlign: 'middle'}} >error</Icon>Please correct the values</p></div>}
            </div>
            <Divider/>
        </div>
    )
};

export default formHeader;