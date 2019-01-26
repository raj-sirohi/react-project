import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import classNames from 'classnames'
import Dropzone from 'react-dropzone'
//import request from "superagent";
import ReactCrop from 'react-image-crop'
//import './custom-image-crop.css';
import 'react-image-crop/dist/ReactCrop.css';

import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef,
    image64CroppedtoCanvasRef
} from './ResuableUtils'

import Logger from '../../loggingUtil/logger';

const logger = Logger('ImageDropField2');

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};
const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100px',
    height: '100px',
    padding: 4,
    boxSizing: 'border-box'
};

const thumbWorking = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: '100px', //'auto',
    height: '100px' //'100%'
};

class ImgDropAndCrop extends Component {
    constructor() {
        super()
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
        this.state = {
            files: [],
            droppedFile:'',
            savedFiles: [],
            imgSrc: null,
            imgSrcExt: null,
            crop: {
                aspect: 1 / 1
            }
        };
    }



    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });

        const currentFile = files[0]
        logger.log('onDrop currentFile', currentFile);
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;
            const canvasRef = this.imagePreviewCanvasRef.current;
            image64toCanvasRef(canvasRef, myResult)
            this.setState({
                imgSrc: myResult,
                droppedFile:currentFile,
                imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            })
        }, false)

        myFileItemReader.readAsDataURL(currentFile)
    }

    handleFileSave = (event) => {
        const { input, classes, width, fullWidth, theme, options, loadOptions, placeholder, meta: { touched, error } } = this.props;
        event.preventDefault()
        const { imgSrc, files } = this.state
        // logger.log('handleFileSave fileName',files[0].name);
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current

            const { imgSrcExt } = this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)


            const myFilename = files[0].name;

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            const sFile = this.state.savedFiles;
            Object.assign(myNewCroppedFile, {
                preview: URL.createObjectURL(myNewCroppedFile)
            })
            input.onChange(this.state.savedFiles);
            // input.onChange(myNewCroppedFile);
            sFile.push(myNewCroppedFile)
            this.setState({ savedFiles: sFile })




            logger.log('handleFileSave savedFiles', this.state.savedFiles);
            this.handleClearToDefault()
        }
    }

    handleImageLoaded = (image) => {
        //console.log(image)
    }
    handleOnCropChange = (crop) => {
        this.setState({ crop: crop })
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        logger.log('pixelCrop', pixelCrop)
        logger.log('pixelCrop.width', pixelCrop.width === 0)

        const canvasRef = this.imagePreviewCanvasRef.current
        const { imgSrc } = this.state
        image64CroppedtoCanvasRef(canvasRef, imgSrc, pixelCrop)
    }

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    handleDownloadClick = (event) => {
        event.preventDefault()
        const { imgSrc } = this.state
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current

            const { imgSrcExt } = this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)


            const myFilename = "previewFile." + imgSrcExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            console.log(myNewCroppedFile)
            // download file
            downloadBase64File(imageData64, myFilename)
            this.handleClearToDefault()
        }


    }

    handleClearToDefault = event => {
        if (event) event.preventDefault()
        const canvas = this.imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            imgSrc: null,
            imgSrcExt: null,
            crop: {
                aspect: 1 / 1
            }

        })

    }

    render() {
        const { imgSrc } = this.state
        const { files, savedFiles } = this.state;
        logger.log('render', savedFiles);

        const { input, classes, width, fullWidth, theme, options, loadOptions, placeholder, meta: { touched, error } } = this.props;

        const thumbs1 = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));

        const thumbs = savedFiles.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));


        const dropImageSection = <Dropzone onDrop={this.onDrop.bind(this)}>
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                let styles = { ...baseStyle }
                styles = isDragActive ? { ...styles, ...activeStyle } : styles
                styles = isDragReject ? { ...styles, ...rejectStyle } : styles

                return (
                    <div
                        {...getRootProps()}
                        style={styles}
                    >
                        <input {...getInputProps()} />
                        <div>
                            {isDragAccept ? 'Drop' : 'Drag'} files here...
                    </div>
                        {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                )
            }}
        </Dropzone>

        const cropImageSection = imgSrc !== null ?
            <div
             style={{border: 'solid red 2px',width:'400px',height:'200px', display:'flex',  justifyContent:'center'}}
            >
            
                <ReactCrop
                    src={imgSrc}
                    imageStyle={{ border: 'solid blue 2px',  display: 'block',width: 'auto', height: '100px' }}
                   style={{ backgroundColor: 'white', border: 'solid red 4px',margin:'auto' }}

                    //style={{border: 'solid red 4px',width:'400px',height:'auto'}}
                    crop={this.state.crop}
                    onImageLoaded={this.handleImageLoaded}
                    onComplete={this.handleOnCropComplete}
                    // onChange={imgSrc => {input.onChange(imgSrc);console.log('aaaaaaa',imgSrc)}}
                    onChange={this.handleOnCropChange}
                />
                <br />
                {this.state.droppedFile.name}
               
                {/* <p>Preview Canvas Crop </p>
                  <canvas style ={{width:'100px',height:'100px'}} ref={this.imagePreviewCanvasRef}></canvas>
                  <button onClick={this.handleDownloadClick}>Download</button>
                  <button onClick={this.handleClearToDefault}>Clear</button> */}
            </div>

            : '';
        const cropPreviewSection = <div><p>Preview Canvas Crop </p>
            <canvas style={{ width: 'auto', height: 'auto' }} ref={this.imagePreviewCanvasRef}></canvas>
            <button onClick={this.handleFileSave}>Save</button>
            <button onClick={this.handleClearToDefault}>Clear</button></div>;

        return (
            <div>
                {/* {imgSrc !== null ? cropImageSection : dropImageSection} */}
                {dropImageSection}
                {cropImageSection}
                {cropPreviewSection}
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>

            </div>
        );
    }



}

export default ImgDropAndCrop