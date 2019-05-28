import React, { Component } from 'react'
import { connect } from "react-redux";
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';
import { Button, GridColumn,Icon } from 'semantic-ui-react';
import ThumbList from '../ThumbList/ThumbList'
import Carousel from '../Carousel/Carousel'
import { Grid, Segment, Dimmer, Loader, Input, Checkbox } from 'semantic-ui-react'
import * as loadImage from 'blueimp-load-image';
import  CheckboxList  from '../CheckboxList/CheckboxList'
import ImgSecurityPreference from '../ImgSecurityPreference/ImgSecurityPreference'
import {  uploadFile, getImage } from '../../../store/actions/mediaActions'
import {base64StringtoFile} from '../../../utils/mediaUtil'

import './DropZone2.css'
import Logger from 'logger';

const logger = Logger('DropZone2');

class DropZone extends Component {

    /* 
    To remove the following warning, using _isMounted trick
    Warning: Can’t call setState (or forceUpdate) on an unmounted component. 
    This is a no-op, but it indicates a memory leak in your application. To fix, 
    cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    */
    _isMounted = false;

    state = {
        fileDropStarted:false,
        droppedFile: '',
        imagePreference:[],
        files: [],
        open: false,
        base64: '',
        isMobile: false
    }

    getPrefCheckboxArray=()=>{
        return(
            [
                { level:4,name: 'private', label: 'Private ',labelColor:'#53c8ff', 
                helpContent:'only for you', icon:'ban',iconColor:'red', value:false,disable:false },

                { level:3,name: 'intimate', label: 'Intimate ',labelColor:'#53c8ff', 
                helpContent:'only for you and intimate circle',icon:'heart',iconColor:'red', value:false,disable:false },
                
                {level:2 , name: 'close', label: 'Close ',labelColor:'#53c8ff', 
                helpContent:'only for you,  intimate and close circle',icon:'gem',iconColor:'red', value:false },
                
                { level:1 ,name: 'known', label: 'Known ',labelColor:'#53c8ff', 
                helpContent:'only for you,  intimate ,close  and known circle',icon:'user plus',iconColor:'red', value:false },
                
                { level:0, name: 'everyone', label: 'Everyone ',labelColor:'#53c8ff', 
                helpContent:'for everyone',icon:'eye',iconColor:'red', value:false }
            ]
        )
    }

    componentDidMount() {
        this._isMounted = true;
     
        window.addEventListener('resize', () => {
            if (this._isMounted){
                this.setState({
                    isMobile: window.innerWidth < 648
                });
            }
        }, false);
    }

    componentWillMount(){
        this.setState({
            imagePreference:this.getPrefCheckboxArray()
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    /*========================================   
      dropzone handlers     
    ==========================================*/  
    onDropHandler = (files) => {
        this.setState({fileDropStarted:true});
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];
        const fileName = droppedFile.name;
        const type = droppedFile.type.split('/')[0]
        logger.log('fileName',fileName);
        logger.log('type',type)

        this.dropVideoHelper(droppedFile)
       /*  loadImage(droppedFile, (img) => {
            // img.className = 'test'; // css class: { max-width: 100%; max-height: 100%; }
            this.setState({ base64: img.toDataURL() })
            const newFile = this.base64StringtoFile(img.toDataURL(), fileName);
           // const preview = URL.createObjectURL(newFile)
           // const file = { file: newFile, type: type, preview: preview }
           Object.assign(newFile, {
            preview: URL.createObjectURL(newFile)
        })
            this.setState({ droppedFile: newFile,fileDropStarted:false })
        }, {
                orientation: true
            }); */
    }

    dropVideoHelper= async(file)=>{
        const imageData64 = await this.props.uploadFile(file);
        logger.log('dropVideoHelper imageData64 ',imageData64);
        const savedFileName = imageData64.data.fileName;
        const savedFile = base64StringtoFile(imageData64.data.imageBase64Data, savedFileName)
        Object.assign(savedFile, {
            preview: URL.createObjectURL(savedFile)
        })
        logger.log('dropVideoHelper savedFile ',savedFile);
        this.setState({ droppedFile: savedFile,fileDropStarted:false })

    }

    dropZoneCancelHandler = (e) => {
        e.stopPropagation();
        this.setState({ droppedFile: '' });
    }

    dropZoneAddHandler = async(e) => {
        e.stopPropagation();
        const { droppedFile,imagePreference } = this.state;
       
        var securityLevelCheckbox= undefined;
        var highestLevel=4;
        imagePreference.forEach(checkbox => {
            
            if (checkbox.value){
                if (checkbox.level <= highestLevel){
                    highestLevel=checkbox.level;
                    securityLevelCheckbox = checkbox;
                }
            }
        });

        const imageData64 = await this.props.uploadFile(droppedFile);

        const savedFileName = imageData64.data.fileName;
        const savedFile = base64StringtoFile(imageData64.data.imageBase64Data, savedFileName)
        Object.assign(savedFile, {
            preview: URL.createObjectURL(savedFile)
        })
       
        this.props.addFile(savedFile,securityLevelCheckbox);
        if (!!securityLevelCheckbox){
            this.setState({ droppedFile: '' });
        }
    }

    dropZoneUpdateHandler = (e) => {
       
    }

    dropZoneDeleteHandler = fileName => {
        const { files } = this.state;
        const newFileArray = files.filter((value) => {
            if (value.file.name !== fileName.file.name) {
                return true
            }
        })
        this.setState({ files: newFileArray })
    }

     /*========================================   
        Image helper methods    
    ==========================================*/  
    base64StringtoFile = (base64String, filename) => {
        var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
    } 

     /*========================================   
      security checkbox handlers     
    ==========================================*/  
    imgSecCheckboxClickHandler=(checkboxList)=>{
        this.setState({imagePreference:checkboxList})
    }
     
    handleCheckBoxClick = (e) => {
        logger.log('handleCHeckBoxClick', e.target.value)
    }

    /*========================================   
        Render helper methods    
    ==========================================*/  
    renderDropImage = () => {
        const { height = '32em' } = this.props;
        var dropZoneHeight = height;
        if (this.state.isMobile) {
            dropZoneHeight = '15em';
        }
        const { droppedFile } = this.state;
        if (!!droppedFile) {
            return (
                <div key={droppedFile.name} className='dropImage2'>
                    <img style={{ maxHeight: dropZoneHeight }}
                        src={droppedFile.preview}
                        className='dropImage__image2'
                    />
                </div>
            )
        }
    }

    renderImagePreferences=(isVertical)=>{
        const {imagePreference}= this.state;
        return(
            <ImgSecurityPreference headerLabelColor='red'
            vertical={isVertical} 
            onImgSecCheckboxClick={this.imgSecCheckboxClickHandler}
            imgSecurityPrefArray={imagePreference} />
        )
    }
   
    renderDropZone = () => {
      //  logger.log('renderDropZone this.state.droppedFile', this.state.droppedFile)
        const { height = '32em', displayImgPreferences = true } = this.props

        var dropZoneHeight = height;

        if (this.state.isMobile) {
            dropZoneHeight = '15em';
        }
        const imageInnerClassArray = [];
        imageInnerClassArray.push('dropzone2__image-inner');
        const imagePrefTopClassArray = [];
        const imagePrefSideClassArray = [];
        // if image preferences are not displayed then set the width to 100%
        if (!displayImgPreferences) {
            // width='100%';
            imageInnerClassArray.push('dropzone2__image-inner--hundred-percent');
            imagePrefTopClassArray.push('dropzone2__image-pref--hide')
            imagePrefSideClassArray.push('dropzone2__image-pref--hide')
        } else {
            imageInnerClassArray.push('dropzone2__image-inner--eighty-percent');
            imagePrefTopClassArray.push('dropzone2__image-pref-top')
            imagePrefSideClassArray.push('dropzone2__image-pref-side')
        }
        const imageInnerClass = imageInnerClassArray.join(" ");
        const imagePrefTopClass = imagePrefTopClassArray.join(" ");
        const imagePrefSideClass = imagePrefSideClassArray.join(" ");

        const buttonSectionClassArray = [];
        buttonSectionClassArray.push('dropzone2__button')
        if (!displayImgPreferences) {
            buttonSectionClassArray.push('dropzone2__button--full-width')
        } else {
            buttonSectionClassArray.push('dropzone2__button--eighty-percent')
        }
        const buttonSectionClass = buttonSectionClassArray.join(" ")

        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone style={{}} onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <Segment inverted className='dropzone2'>
                        <Dimmer active={this.state.fileDropStarted}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <div className={imagePrefTopClass}>
                        { this.renderImagePreferences(false) }
                        </div>
                        <div style={{ height: dropZoneHeight }} className='dropzone2__image-outer' >
                            <div {...getRootProps()} className={imageInnerClass}>
                                <input {...getInputProps()} />
                                <div style={{ height: dropZoneHeight }} className='dropzone2__image' >
                                    {isFileDropped && this.renderDropImage()}
                                    {isFileDropped || <p style={{ color: '#c7c7c7', padding: '1em' }}>
                                        Drag 'n' drop some files here, or click to select files
                                    </p>
                                    }
                                </div>
                            </div>

                            <div className={imagePrefSideClass} >
                                <Segment inverted >
                                    { this.renderImagePreferences(true) }
                                </Segment>
                            </div>
                        </div>
                        <div className={buttonSectionClass}>
                            <Button onClick={this.dropZoneAddHandler}
                             onMouseDown={e => e.preventDefault()}
                             inverted
                                content='Add File' size='mini' color='blue' />
                            <Button onClick={this.dropZoneUpdateHandler} inverted
                                content='Update File' size='mini' color='blue' />
                            <Button onClick={this.dropZoneCancelHandler}
                                inverted color='blue' content='Cancel'
                                size='mini' />
                                 <Button onClick={this.dropZoneDeleteHandler}
                                inverted color='red' content='Delete'
                                size='mini' />
                        </div>
                    </Segment>
                )}
            </Dropzone>
        )
    }

    render() {
        return (
            <div >
                {this.renderDropZone()}
            </div>
        )
    }
}

DropZone.propTypes = {
    height: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
    return {

        getImage: (imageUrl) => dispatch(getImage(imageUrl)),
        uploadFile: (data) => dispatch(uploadFile(data))

    }
}

export default connect(null, mapDispatchToProps)(DropZone);

