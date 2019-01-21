import React from 'react';
import "./modal.css";

const backdrop = (props)=>(


        props.show? <div className='backdrop' onClick={props.clicked}></div> : null

);

export default backdrop;