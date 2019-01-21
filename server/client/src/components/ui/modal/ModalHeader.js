import React from "react";
import "./modal.css";

const modalHeader =(props)=>{
    return (

        <div className="modalHeader">
                <p>{props.title}</p>
               
        </div>
    )
};

export default modalHeader;