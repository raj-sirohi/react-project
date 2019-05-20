import React from 'react';
import { Checkbox, Segment, Grid } from 'semantic-ui-react';
import moment from 'moment'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './ImagePreference.css';
import Logger from 'logger';

const logger = Logger('ImagePreference');

export const ImagePreference = ({vertical=true}) => {
  const flexDirection=vertical? 'column':'row';
  const className = vertical? 'image-preference': ['image-preference', 'image-preference--horizontal'].join(" ");

  const checkboxClassArray = [];
  checkboxClassArray.push('image-preference__checkbox');
  if (vertical){
    checkboxClassArray.push('image-preference__checkbox--vertical');
  }
  else{
    checkboxClassArray.push('image-preference__checkbox--horizontal');
  }
  const checkboxClass = checkboxClassArray.join(" ");
    return (
        <div className='image-preference-wrapper'>
            <div className={className}
           // style={{width:'100%', }}
            >
                
           
         
           <div className='image-preference__title'>
                <label>Display Preferences</label>
            </div>
            <div className={checkboxClass}
                //className='image-preference__checkbox'
                //style={{ display: 'flex', flexDirection: flexDirection, justifyContent:'space-between' }}
                >
                <Checkbox style={{ marginTop: '1em' }} label='Private circle' />
                <Checkbox style={{ marginTop: '1em' }} label='Intimate circle' />
                <Checkbox style={{ marginTop: '1em' }} label='Inner' />
                <Checkbox style={{ marginTop: '1em' }} label='Public' />
            </div>
           </div>
           </div>
        

    )
}