import React, { Component } from 'react';
import { Header, Button, Message, Card, Container } from 'semantic-ui-react'
import DropZone2 from '../UI/DropZone/DropZone2';
import ThumbList from '../UI/ThumbList/ThumbList'
import checkboxList from '../UI/CheckboxList/CheckboxList'
import Logger from 'logger';
import CheckboxList from '../UI/CheckboxList/CheckboxList';
import ImgSecurityPreference from '../UI/ImgSecurityPreference/ImgSecurityPreference'
import playIcon from './button_play_blue.png';
import {VideoIcon} from '../UI/VideoIcon/VideoIcon'

const logger = Logger('Gallery');

class Gallery extends Component {

    state = {
        files: [],
        error: false
    }

    getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    buttonClickHandler = () => {
        logger.log('dimentions', this.getWindowDimensions())
    }

    addFileHandler = (newFile, securityLevelCheckbox) => {
        logger.log('addFileHandler newFile', newFile);
        if (!!securityLevelCheckbox){
            Object.assign(newFile, {
                icon: securityLevelCheckbox.icon,
                iconColor: securityLevelCheckbox.iconColor,
                helpContent: securityLevelCheckbox.helpContent
    
            });
            this.setState({ files: [...this.state.files, newFile],error:false })
        }else{
            this.setState({error:true })
        }
    }

    renderGallery = () => {
        const { files,error } = this.state;
        return (
            <div >
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '100%' }}>
                        <DropZone2 height='32em' displayImgPreferences={true}
                            addFile={this.addFileHandler}
                        />
                    </div>
                </div>
                <div>
                    <div >
                        <ThumbList files={files} />
                        <VideoIcon />
                      {error &&  <Message
                            error
                            header='Error!'
                            content='Please select image display preference.'
                        />
                      }
                    </div>
                </div>
            </div>
        )
    }

    checkboxClickHander = (checkboxList) => {
        logger.log('checkboxClickHandler', checkboxList);
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

                        <Button onClick={this.buttonClickHandler} color='blue'>
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

//street name
// park