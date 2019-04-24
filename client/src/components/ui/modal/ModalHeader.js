import React from "react";
import {Divider} from 'semantic-ui-react'
import "./modal.css";

const modalHeader =(props)=>{
    return (
       <div>
        <div className="modalHeader">
                <p>{props.title}</p>
               
               
        </div>
        <Divider/>
        </div>
    )
};

export default modalHeader;