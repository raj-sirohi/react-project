import React from "react";
import Divider from '@material-ui/core/Divider';
import "./Form.css";

const formBody = (props)=>{
console.log('formbody props',props);
    return(

        <div className="formBody">

            {props.children}
           
        </div>
    )
}

export default formBody;