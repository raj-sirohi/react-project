import React, { Component } from 'react';
import { Header, Button, Card, Container } from 'semantic-ui-react'
import DropZone2 from '../UI/DropZone/DropZone2';
import {ImagePreference} from '../UI/ImagePreference/ImagePreference'

import Logger from 'logger';

const logger = Logger('Gallery');

class Gallery extends Component {

  getWindowDimensions=()=> {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

      buttonClickHandler =()=>{
          logger.log('dimentions',this.getWindowDimensions())
      }
    renderGallery = () => {

        return (

            <div >

                <div style={{display:'flex'}}>
                <div style={{ width: '100%' }}>
                    <DropZone2 height='32em' displayImgPreferences={true}/>
                </div>
                
                </div>
               

                <div>

                   <div style={{ marginTop:'1em',border: '1px solid black', height: '100px', width: '100%' }}>
                    </div>
                   

                </div>
                
            </div>
        )
    }
    render() {
        return (
            <React.Fragment>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Manage My Collection</Card.Header>
                        <Card.Description>
                            {this.renderGallery()}
                            <ImagePreference/>
                            <ImagePreference/>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                        <Button  onClick={this.buttonClickHandler} color='blue'>
                            Approve
          </Button>
                        <Button basic color='red'>
                            Decline
          </Button>

                    </Card.Content>
                </Card>
            </React.Fragment>
        )
    }
}
export default Gallery;