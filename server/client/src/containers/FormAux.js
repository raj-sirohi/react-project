import React ,{Component} from "react";
import "./FormAux.css";

const formAux =(props)=>(


    <div className='formWrapper'>



        <div className='formBody'>
            {props.children}
        </div>

        <div>
            <div className='formButtons'>
                {props.buttonList}
            </div>
        </div>

    </div>

)

export default formAux;