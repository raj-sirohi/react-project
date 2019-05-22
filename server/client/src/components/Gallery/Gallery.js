import React, { Component } from 'react';
import { Header, Button, Card, Container } from 'semantic-ui-react'
import DropZone2 from '../UI/DropZone/DropZone2';
import ThumbList from '../UI/ThumbList/ThumbList'

import Logger from 'logger';

const logger = Logger('Gallery');

class Gallery extends Component {

    state={
        files:[]
    }

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

      addFileHandler =(newFile)=>{
        logger.log('newFile',newFile);
        this.setState({files:[...this.state.files,newFile]})
      }
    renderGallery = () => {
        const {files}= this.state;
        return (

            <div >

                <div style={{display:'flex'}}>
                <div style={{ width: '100%' }}>
                    <DropZone2 height='32em' displayImgPreferences={true}
                    addFile={this.addFileHandler}
                    />
                </div>
                
                </div>
               

                <div>
             
                   <div >
                       <ThumbList files={files}/>
                    </div>
                   

                </div>
                
            </div>
        )
    }

    checkboxClickHander=(checkboxList)=>{
        logger.log('checkboxClickHandler', checkboxList);
    }

    getCheckboxArray=()=>{
        return(
            [
                { name: 'private', label: 'private label', icon:'user',iconColor:'red', value:false },
                { name: 'intimate', label: 'intimate label', icon:'eye',iconColor:'teal', value:false },
                { name: 'inner', label: 'inner label', icon:'', iconColor:'', value:false },
                { name: 'public', label: 'public label', icon:'',iconColor:'', value:false }
            ]
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