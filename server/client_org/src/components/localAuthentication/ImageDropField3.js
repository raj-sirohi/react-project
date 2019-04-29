// displays images and videos as preview when they are dropped in drop section,
// and when images/videos are dropped hided the drop section

import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { createUser, getUserById, uploadFile, getImage } from '../../store/actions/authActions'
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone'
//import request from "superagent";
import ReactCrop from 'react-image-crop'
//import './custom-image-crop.css';
import InputField from '../ui/input/InputField';
import 'react-image-crop/dist/ReactCrop.css';
import Icon from '@material-ui/core/Icon';
import { connect } from "react-redux";
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef,
    image64CroppedtoCanvasRef
} from './ResuableUtils'
import VideoThumbnail from 'react-video-thumbnail';
import Logger from '../../loggingUtil/logger';

const logger = Logger('ImageDropField3');

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

const styles = {
    card: {
        maxWidth: 200,
        maxHeigh: 200
    },
    media: {
        height: 140,
    },
};

class ImgDropAndCrop extends Component {
    constructor() {
        super()
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
        this.state = {
            fileType: null,
            files: [],
            droppedFile: '',
            droppedFileType: '',
            savedFiles: [],
            imgSrc: null,
            imgSrcExt: null,
            videoFile: [],
            videoCurrent: null,
            crop: {
                aspect: 1 / 1
            }
        };
    }
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    componentDidMount() {
        //   this.setObjectURL();
        this.setSavedFile();
    }

    setSavedFile = async () => {
        let savedFiles = [];
        const { input } = this.props

        if (!!input.value) {
            const savedImages = input.value;
            for (const image of savedImages) {
                const imageData64 = await this.props.getImage(image);
                const fileName = image.split('/').pop()
                const savedFile = base64StringtoFile(imageData64.data, fileName)
                Object.assign(savedFile, {
                    preview: URL.createObjectURL(savedFile)
                })

                savedFiles.push(savedFile);
            }

        }

        this.setState({ savedFiles: savedFiles })
        input.onChange(this.state.savedFiles);
    }

    setObjectURL = async () => {
        let savedFiles = [];
        const { input } = this.props

        if (!!input.value) {
            const savedImages = input.value;
            for (const image of savedImages) {
                const objectUrl = await this.getObjectURL(image)

                savedFiles.push(objectUrl);
            }

        }

        this.setState({ savedFiles: savedFiles })
        input.onChange(this.state.savedFiles);
    }

    getObjectURL = async (imageUrl) => {
        const imageData = await this.props.getImage(imageUrl);
        const a = imageData.data;
        const blob = this.dataURItoBlob(a)
        const preview = URL.createObjectURL(blob)
        return preview;
    }

    dataURItoBlob = (dataURI) => {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        else
            byteString = unescape(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    onDrop(files) {
        //image/jpeg
        //video/mp4
        const currentFile = files[0]
        const type = currentFile.type.split('/')[0]
        // logger.log('type', type)
        // logger.log('onDrop currentFile', currentFile)
        this.props.uploadFile(currentFile);
        Object.assign(currentFile, {
            preview: URL.createObjectURL(currentFile)
        })
        this.setState({ droppedFileType: type, droppedFile: currentFile });

    }

    onDrop1(files) {
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
                droppedFile: currentFile,
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
            this.handleCancel()
        }
    }

    handleCancel = event => {
        this.setState({
            fileType: null,
            imgSrc: null,
            imgSrcExt: null,
            videoCurrent: null,
            droppedFile: null,
            droppedFileType: null,
            crop: {
                aspect: 1 / 1
            }
        })
    }

    videoPreviewSection = () => {
        const {droppedFile,droppedFileType}=this.state;
        const {classes}= this.props;

        const videoPreview = !!droppedFileType?droppedFileType==='video'?true:false:false;

        return (
            videoPreview && <div>
                <Icon color="disabled" style={{ fontSize: 60 }}>
                    play_circle_filled_white
                                 </Icon>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {droppedFile.name}
                </Typography>
            </div>
        );
    }

    imagePreviewSection = () => {
        const {droppedFile,droppedFileType}=this.state;
        const {classes}= this.props;
        const imagePreview = !!droppedFileType?droppedFileType==='image'?true:false:false;

        return (
            imagePreview && <div>
            <img
                src={droppedFile.preview}
                style={img} />
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {droppedFile.name}
            </Typography>
        </div>
        );
    }

    render() {
        const { imgSrc } = this.state
        const { files, droppedFile, savedFiles, videoFile } = this.state;

        const singleFile = savedFiles[0];


        const { input, classes, width, fullWidth, theme, options, loadOptions, placeholder, meta: { touched, error } } = this.props;


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
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                           uploadProgress
                      </Typography>
                    </div>
                )
            }}
        </Dropzone>




        const mediaPreview = this.state.droppedFileType === 'video' ? 'video' : 'image'

        const uploadSection = <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    {mediaPreview === 'image' ? this.imagePreviewSection() : this.videoPreviewSection()}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    upload
                                </Button>
                <Button onClick={this.handleCancel} size="small" color="primary">
                    cancel
                                </Button>
            </CardActions>
        </Card>

        return (
            <div>

                {!!this.state.droppedFile ? uploadSection : dropImageSection}
              
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>

            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {

        getImage: (imageUrl) => dispatch(getImage(imageUrl)),
        uploadFile: (data) => dispatch(uploadFile(data))

    }
}

ImgDropAndCrop.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default ImgDropAndCrop

export default connect(null, mapDispatchToProps)(withStyles(styles)(ImgDropAndCrop));
