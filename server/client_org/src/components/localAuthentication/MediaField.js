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

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef,
    image64CroppedtoCanvasRef
} from './ResuableUtils'
import VideoThumbnail from 'react-video-thumbnail';
import playIcon from './button_play_blue.png';
import ReactPlayer from 'react-player'
import Logger from '../../loggingUtil/logger';
import zIndex from "../../../node_modules/@material-ui/core/styles/zIndex";
import MediaViewField from './MediaViewField';

const logger = Logger('MediaField');

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
    boxSizing: 'border-box',

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

const playIconImg={
    position: 'absolute',
     zIndex: '100',
      top: '20%',
      left: '20%',
   margin: 'auto'
}

const styles = {
    card: {
        maxWidth: 200,
        maxHeigh: 200
    },
    media: {
        height: 140,
    },
};

class MediaField extends Component {
    constructor() {
        super()
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
        this.state = {
            open: false,
            fileType: null,
            files: [],
            droppedFile: '',
            droppedFileType: '',
            savedFiles: [],
            mediaFiles: [],
            selectedMediaFile:null,
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
                logger.log('setSavedFile imageData64.data',imageData64.data);
               // const fileName = image.split('/').pop()
                //const savedFile = base64StringtoFile(imageData64.data, fileName)
                // Object.assign(savedFile, {
                //     preview: URL.createObjectURL(savedFile)
                // })

               // Object.assign(savedFile, {
               //     preview: imageData64
               // })

                savedFiles.push(imageData64.data);
            }

        }

        this.setState({ mediaFiles: savedFiles })
        input.onChange(this.state.savedFiles);
    }

    setSavedFile11 = async () => {
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

    //setSavedFile = async () => {
    onDrop = async (files) => {
        //image/jpeg
        //video/mp4
        const currentFile = files[0]
        const type = currentFile.type.split('/')[0]

        const imageData64 = await this.props.uploadFile(currentFile);
        logger.log('onDrop imageData64', imageData64.data)

        const fileName = imageData64.data.fileName;
        const savedFile = base64StringtoFile(imageData64.data.imageBase64Data, fileName)
        Object.assign(savedFile, {
            preview: URL.createObjectURL(savedFile)
        })
        const savedFiles = this.state.savedFiles;

        savedFiles.push(savedFile);
        const mediaFile = { file: savedFile, type: type }
        this.setState({ savedFiles: savedFiles, mediaFiles: this.state.mediaFiles.concat(imageData64.data) });


    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleMediaClick=(mediaFile)=>{
       // logger.log('handleMediaClick file',JSON.stringify(file));
       // console.log('aaaaaaaaaaaaaa',mediaFile)
        this.setState({ open: true,selectedMediaFile: mediaFile})
    }

    render() {
        const { imgSrc } = this.state
        const { mediaFiles, files, droppedFile, savedFiles, videoFile } = this.state;

        const singleFile = savedFiles[0];


        const { input, classes, width, fullWidth, theme, options, loadOptions, placeholder, meta: { touched, error } } = this.props;
      // logger.log('render this.state.selectedMediaFile', this.state.selectedMediaFile);

        // const thumbs = savedFiles.map(file => (
        //     <div style={thumb} key={file.name}>
        //         <div style={thumbInner}>
        //             <img
        //                 src={file.preview}
        //                 style={img}
        //             />
        //         </div>
        //     </div>
        // ));

        const imageThumbs = mediaFiles.map(mediaFile => {
           // logger.log('imageThumbs mediaFile',mediaFile.file);
            const type = mediaFile.type
            if (type === 'image') {
                return (
                    <div style={thumb} key={mediaFile.fileName}
                    onClick={()=>this.handleMediaClick(mediaFile)} >
                        <div style={thumbInner}>
                            <img
                                src={mediaFile.imageBase64Data}
                                style={img}
                            />
                        </div>
                    </div>
                )
            }

        });

        const videoThumbs = mediaFiles.map(mediaFile => {
            logger.log('videoThumbs mediaFile',mediaFile);
            const type = mediaFile.type
            if (type === 'video') {
                return (
                    <div style={thumb} key={mediaFile.fileName}
                     onClick={()=>this.handleMediaClick(mediaFile)} >
                        <div style={thumbInner}>
                            <div style={{ position: 'relative', float: 'left' }}
                            >
                                <img
                                    src={mediaFile.imageBase64Data}
                                   
                                    style={img}
                                />
                                {/* <div style={{
                                    position: 'absolute', zIndex: '100', top: '20%',
                                    margin: 'auto', left: '20%'
                                }} > */}

                                    <img style={playIconImg} src={playIcon} />

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                )
            }

        });

        // const videoThumbs1 = mediaFiles.map(mediaFile => {
        //     const type = mediaFile.type
        //     if (type === 'video') {
        //         return (
        //             <div style={thumb} key={mediaFile.file.name}>
        //                 <div style={{ position: 'relative', float: 'left' }}>


        //                     <img
        //                         src={mediaFile.file.preview}

        //                         onClick={() => this.setState({ open: true })}
        //                     />
        //                     <div style={{
        //                         position: 'absolute', zIndex: '100', top: '20%',
        //                         width: '100px', height: '100px', margin: '0 auto', left: '0px', right: '0px'
        //                     }} >
        //                         {/* <h1 style={{color:'white'}}> this is icon</h1> */}
        //                         <img src={playIcon} />
        //                         <Icon color="disabled" style={{ fontSize: 60 }}>
        //                             play_circle_filled_white
        //                          </Icon>
        //                     </div>

        //                 </div>
        //             </div>
        //         )
        //     }

        // });

      


        const dialog = <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
        </Button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
            </DialogContentText>
                    <ReactPlayer height='100%'
                        width='100%'
                        url="/api/videos/file_example_MP4_480_1_5MG.mp4"

                        controls />
                         <aside style={thumbsContainer}>
                    {imageThumbs}
                </aside>
                

                    <aside style={thumbsContainer}>
                        {videoThumbs}
                    </aside>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
            </Button>
                </DialogActions>
            </Dialog>
        </div>;




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

        return (
            <div>
                {/* {dialog} */}
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
                </Button>
                <MediaViewField handleClose ={()=>this.setState({open:false})} 
                open={this.state.open} 
                selectedMediaFile={this.state.selectedMediaFile} 
                mediaFiles={this.state.mediaFiles}/>
                {dropImageSection}
                <aside style={thumbsContainer}>
                    {imageThumbs}
                </aside>
                <div >

                    <aside style={thumbsContainer}>
                        {videoThumbs}
                    </aside>
                </div>


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

MediaField.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default ImgDropAndCrop

export default connect(null, mapDispatchToProps)(withStyles(styles)(MediaField));
