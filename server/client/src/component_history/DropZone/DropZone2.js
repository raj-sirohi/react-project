// contains drop zone with Grid, with flex

import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, GridColumn } from 'semantic-ui-react';
import ThumbList from '../ThumbList/ThumbList'
import Carousel from '../Carousel/Carousel'
import { Grid, Segment, Input, Checkbox } from 'semantic-ui-react'
import * as loadImage from 'blueimp-load-image';
import { ImagePreference } from '../ImagePreference/ImagePreference'

import './DropZone2.css'
import Logger from 'logger';

const logger = Logger('DropZone2');

class DropZone extends Component {

    state = {
        droppedFile: '',
        files: [],
        open: false,
        base64: ''
    }

    componentDidMount() {
        //  const { input } = this.props;
        //  input.onChange(this.state.files);
    }

    componentDidUpdate() {
        //  const { input } = this.props;
        //  input.onChange(this.state.files);
    }

    onDropHandler = (files) => {
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];
        const fileName = droppedFile.name;
        const type = droppedFile.type.split('/')[0]

        loadImage(droppedFile, (img) => {
            // img.className = 'test'; // css class: { max-width: 100%; max-height: 100%; }
            this.setState({ base64: img.toDataURL() })
            const newFile = this.base64StringtoFile(img.toDataURL(), fileName);
            const preview = URL.createObjectURL(newFile)
            const file = { file: newFile, type: type, preview: preview }
            this.setState({ droppedFile: file })
        }, {
                orientation: true
            });
    }

    dropZoneClearHandler = (e) => {
        e.stopPropagation();
        this.setState({ droppedFile: '' });
    }

    dropZoneAddHandler = (e) => {
        e.stopPropagation();
        const { droppedFile } = this.state;
        const newStateFiles = this.state.files.slice();
        newStateFiles.unshift(droppedFile);
        this.setState({ droppedFile: '', files: newStateFiles })
        // const { input } = this.props;
        // input.onChange(this.state.files);
    }

    openModalHandler = (e) => {
        e.preventDefault();
        this.setState({ open: true })
    }
    onCloseModalHanlder = () => {
        this.setState({ open: false })
    }

    base64StringtoFile = (base64String, filename) => {
        var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
    }

    renderDropImage = () => {
        const { droppedFile } = this.state;
        if (!!droppedFile) {
            return (
                <div key={droppedFile.file.name} className='dropImage2'>
                    <img
                        src={droppedFile.preview}
                        className='dropImage__image2'
                    />
                </div>
            )
        }
    }
    handleCheckBoxClick = (e) => {
        logger.log('handleCHeckBoxClick', e.target.value)
    }

    state = { checked: false }
    toggle = () => {
        logger.log('toggle', this.state)
        this.setState(prevState => ({ checked: !prevState.checked }))
    }

    // without grid
    renderDropZone_orig = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone style={{}} onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <Segment inverted style={{ width: '100%' }}>
                        <div {...getRootProps()} className='dropZone2-wrapper' >

                            <input {...getInputProps()} />
                            <div className='dropZone2'
                            // style={{ display: 'flex', alignItems: 'center', height: '32em' }}
                            >
                                <div
                                    className='dropZone2__image'
                                // style={{ textAlign: 'center', margin: 'auto', width: '80%' }}
                                >
                                    {isFileDropped && this.renderDropImage()}
                                    {isFileDropped || <p style={{ color: '#c7c7c7', padding: '1em' }}>
                                        Drag 'n' drop some files here, or click to select files
                                    </p>
                                    }

                                </div>

                                <div className='dropZone2__checkBox'
                                // style={{ alignSelf: 'baseline', width: '20%' }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <Segment inverted >
                                            <div className='dropZone2__checkBox-title'>
                                                <label
                                                >Display Preferences</label>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Checkbox style={{ marginTop: '1em' }} label='Private circle' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Intimate circle' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Inner' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Public' />
                                            </div>
                                        </Segment>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                            <Button onClick={this.dropZoneAddHandler} inverted style={{ margin: '0 1em' }}
                                content='Add New Files' size='mini' color='blue' />
                            <Button onClick={this.dropZoneAddHandler} inverted style={{ margin: '0 1em' }}
                                content='Add' size='mini' color='blue' />
                            <Button onClick={this.dropZoneClearHandler}
                                inverted style={{ margin: '0 1em' }} color='red' content='Cancel' size='mini' />
                        </div>

                        {/* <div style={{  textAlign: 'center', width: '80%' }}>
                            <Button onClick={this.dropZoneAddHandler} inverted
                                content='Add' size='mini' color='blue' />
                            <Button onClick={this.dropZoneClearHandler} inverted color='red' content='Cancel' size='mini' />
                        </div> */}
                    </Segment>
                )}
            </Dropzone>
        )
    }

    // with grid !
    renderDropZone2 = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone style={{}} onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <Segment inverted style={{ width: '100%' }}>
                        <Grid columns={1}>
                            <Grid.Row >
                                <Grid.Column className='a1' width={12}>
                                    <div {...getRootProps()} className='dropZone3' >
                                        <input {...getInputProps()} />
                                        {isFileDropped && this.renderDropImage()}
                                        {isFileDropped || <p style={{ color: '#c7c7c7' }}>
                                            Drag 'n' drop some files here, or click to select files
                                    </p>
                                        }
                                    </div>
                                </Grid.Column>

                                <Grid.Column className='a' width={4}>
                                    <Grid.Row>
                                        <GridColumn>
                                            <div className='dropZone3__checkBox-title'>
                                                <label>Display Preferences</label>
                                            </div>

                                        </GridColumn>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column  >
                                            <div className='dropZone3__checkBox'
                                                style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Checkbox style={{ marginTop: '1em' }} label='Private circle' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Intimate circle' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Inner' />
                                                <Checkbox style={{ marginTop: '1em' }} label='Public' />
                                            </div>

                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                )}
            </Dropzone>
        )
    }

    // THIRD VERSION WITHOUT GRID
    renderDropZone = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone style={{}} onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <Segment inverted style={{ width: '100%' }}>
                    <div className='image-pref-vertical'>
                    <ImagePreference vertical={false}/>
                    </div>
                   
                        <div  className='dropZone2-wrapper-3' >
                            <div {...getRootProps()} className='dropZone2-3'>
                                <input {...getInputProps()} />
                                <div className='dropzone2-image-3' >
                                
                                    {isFileDropped && this.renderDropImage()}
                                    {isFileDropped || <p style={{ color: '#c7c7c7', padding: '1em' }}>
                                        Drag 'n' drop some files here, or click to select files
                                    </p>
                                    }
                                </div>
                            </div>

                            <div className='dropZone-image-pref' >
                                <Segment inverted >
                                    <div >
                                       <ImagePreference vertical={true}/>
                                    </div>
                                </Segment>
                            </div>
                        </div>
                        <div 
                        style={{ display: 'flex', justifyContent: 'center',width:'80%'}}
                        >
                        <Button onClick={this.dropZoneAddHandler} inverted 
                                content='Add New Files' size='mini' color='blue' />
                            <Button onClick={this.dropZoneAddHandler} inverted 
                                content='Add' size='mini' color='blue' />
                            <Button onClick={this.dropZoneClearHandler}
                                inverted  color='red' content='Cancel' 
                                size='mini' />
                      
                           
                        </div>
                    </Segment>
                )}
            </Dropzone>
        )
    }


    deleteImageHandler = fileName => {
        const { files } = this.state;
        const newFileArray = files.filter((value) => {
            if (value.file.name !== fileName.file.name) {
                return true
            }
        })
        this.setState({ files: newFileArray })
    }

    render() {
        // logger.log(' render this.state', this.state)
        return (
            <div
            // style ={{display:'flex',justifyContent:'space-around'}}
            >
                {this.renderDropZone()}
                {/* <ImagePreference /> */}



            </div>
        )
    }
}

export default DropZone
