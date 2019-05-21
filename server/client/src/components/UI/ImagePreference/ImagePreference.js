import React from 'react';
import { Checkbox,Icon } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import './ImagePreference.css';
import Logger from 'logger';

const logger = Logger('ImagePreference');

export const ImagePreference = (props) => {
  logger.log('props',props);
  const {vertical=true}=props;
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
            <div className={className}>
           <div className='image-preference__title'>
                <label>Display Preferences</label>
            </div>
            <div className={checkboxClass}>
                <Checkbox style={{ marginTop: '1em' }} 
                // onChange={onChange}
                // checked={checked}
                label={<label>Private circle <span><Icon circular size='small' inverted name ='user' color='teal'></Icon></span></label>} />
                <Checkbox style={{ marginTop: '1em' }} label='Intimate circle' />
                <Checkbox style={{ marginTop: '1em' }} label='Inner' />
                <Checkbox style={{ marginTop: '1em' }} label='Public' />
            </div>
           </div>
           </div>
        

    )
}