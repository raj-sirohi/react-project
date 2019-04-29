import React from "react";
import "./modal.css";

const modalButtonPanel = (props)=>{

    return (

        <div className="modalButtonPanel">

            {props.children}
        </div>
    )
}

export default modalButtonPanel;