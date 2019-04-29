import React from "react";
import Divider from '@material-ui/core/Divider';
import "./Form.css"

const formButtonPanel = (props)=>{

    return (
       <div className='formButtonOuter'>
            <Divider/>
          <div className="formButtonInner">
        
            {props.children}
          </div>
            
         
        </div>
    )
}

export default formButtonPanel;