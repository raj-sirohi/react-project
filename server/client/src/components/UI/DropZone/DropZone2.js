import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'semantic-ui-react';
import ThumbList from '../ThumbList/ThumbList'
import Carousel from '../Carousel/Carousel'
import { Grid, Segment, Input, Checkbox } from 'semantic-ui-react'
import * as loadImage from 'blueimp-load-image';

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


    renderDropZone = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone style={{}} onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <Segment inverted style={{ width: '100%' }}>
                        <div {...getRootProps()} className='dropZone-wrapper' >

                            <input {...getInputProps()} />
                            <div className='dropZone-wrapper__dropzone'
                           // style={{ display: 'flex', alignItems: 'center', height: '32em' }}
                            >
                                <div style={{ textAlign: 'center', margin: 'auto', width: '80%' }}>
                                    {isFileDropped && this.renderDropImage()}
                                    {isFileDropped || <p style={{ color: '#c7c7c7', padding: '1em' }}>
                                        Drag 'n' drop some files here, or click to select files
                                    </p>
                                    }

                                </div>

                                <div style={{ alignSelf: 'baseline', width: '20%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center1' }}>
                                        <Segment inverted >
                                            <label style={{ fontWeight: 'bold' }}>Display Preferences</label>
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
                        <div style={{ marginBottom: '2px', textAlign: 'center', width: '80%' }}>
                            <Button onClick={this.dropZoneAddHandler} inverted
                                content='Add' size='mini' color='blue' />
                            <Button onClick={this.dropZoneClearHandler} inverted color='red' content='Cancel' size='mini' />
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
            <div>
                {this.renderDropZone()}




            </div>
        )
    }
}

export default DropZone
