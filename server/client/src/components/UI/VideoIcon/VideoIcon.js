
import React from 'react';
import playIcon from './button_play_blue.png';
import { Grid, Image,Segment, Dimmer, Loader, Input, Checkbox } from 'semantic-ui-react'

export const VideoIcon = (props) => {
    const { maxHeight='32em' } = props
    return (

       
            <div  style={{textAlign:'center'}}>
            <Segment style={{background:'#eeeeee'}} >
            <Image src={playIcon} size='small'  />
          
            </Segment>
               
           
        </div>

    )
}