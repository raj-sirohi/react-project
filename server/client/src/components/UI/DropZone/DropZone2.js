import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button} from 'semantic-ui-react';
import ThumbList from '../ThumbList/ThumbList'
import Carousel from '../Carousel/Carousel'
import { Grid, Segment } from 'semantic-ui-react'
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
                <div key={droppedFile.file.name} className='dropImage'>
                    <img
                        src={droppedFile.preview}
                        className='dropImage__image'
                    />
                </div>
            )
        }
    }

    renderDropZone = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (

                    <div {...getRootProps()} className='dropZone2' >
                        <input {...getInputProps()} />
                        <div style={{ margin: 'auto' }}>
                            {isFileDropped && this.renderDropImage()}
                            {isFileDropped || <p style={{ color: '#c7c7c7', padding: '14px' }}>
                                Drag 'n' drop some files here, or click to select files
                            </p>
                            }
                        </div>
                       
                    </div>

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
               
                   
                       
                            <label>Test label</label>
                            {this.renderDropZone()}
                       
                   
                   
                
                {this.state.open && <Carousel files={this.state.files}
                    open={this.state.open}
                    deleteImage={this.deleteImageHandler}
                    onClose={this.onCloseModalHanlder} />}
                <Button content='open Modal'
                    onClick={this.openModalHandler} />
            </div>
        )
    }
}

export default DropZone
