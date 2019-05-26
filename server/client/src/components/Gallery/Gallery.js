import React, { Component } from 'react';
import { Header, Button, Card, Container } from 'semantic-ui-react'
import DropZone2 from '../UI/DropZone/DropZone2';
import ThumbList from '../UI/ThumbList/ThumbList'
import checkboxList from '../UI/CheckboxList/CheckboxList'
import Logger from 'logger';
import CheckboxList from '../UI/CheckboxList/CheckboxList';
import ImgSecurityPreference from '../UI/ImgSecurityPreference/ImgSecurityPreference'

const logger = Logger('Gallery');

class Gallery extends Component {

    state = {
        files: []
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
      /*   var highestLevel= undefined;
        var highestLevelCheckbox=3;
        var found=false;
        imagePreferernce.forEach(checkbox => {
            
            if (checkbox.value){
                if (checkbox.level <= highestLevelCheckbox){
                    highestLevelCheckbox=checkbox.level;
                    highestLevel = checkbox;
                    found=true;

                }
            }
        }); */
        logger.log('addFileHandler highestLevel', securityLevelCheckbox);
        this.setState({ files: [...this.state.files, newFile] })
    }
    renderGallery = () => {
        const { files } = this.state;
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
                    </div>


                </div>

            </div>
        )
    }

    checkboxClickHander = (checkboxList) => {
        logger.log('checkboxClickHandler', checkboxList);
    }

    getCheckboxArray = () => {
        return (
            [
                { level: 3, name: 'private', label: 'private label',labelColor:'#53c8ff', icon: 'user', iconColor: 'red', disable: false, value: false },

                {
                    level: 2, name: 'intimate', label: 'intimate label',labelColor:'#53c8ff', icon: 'eye', iconColor: 'teal',
                    disable: false, value: false
                },

                {
                    level: 1, name: 'inner', label: 'inner label',labelColor:'#53c8ff', icon: '',
                    disable: false, value: false
                },

                {
                    level: 0, name: 'public', label: 'public label', labelColor:'#53c8ff', icon: '',
                    disable: false, value: false
                }
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
                            <CheckboxList headerLabelColor='red'
                             onCheckboxClick={this.checkboxClickHander}
                                checkboxArray={this.getCheckboxArray()} />
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