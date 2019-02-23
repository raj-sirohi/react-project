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

const logger = Logger('MediaViewField');

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

class MediaViewField extends Component {
    constructor() {
        super()
        this.imagePreviewCanvasRef = React.createRef()
        this.fileInputRef = React.createRef()
       
        this.state = {
            open: false,
           
            videoFiles: [],
            imageFiles:[],
            mediaFiles:[],
            selectedMediaFile:null
           
        };
    }
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
       // this.state.videoFiles.forEach(file => URL.revokeObjectURL(videoFiles.preview));
       // this.state.imageFiles.forEach(file => URL.revokeObjectURL(imageFiles.preview))
    }

    componentDidUpdate(){
        const {open}=this.props;
        //  this.setSavedFile();
        //  this.setState({ open: open }) 
          logger.log('componentDidUpdate open',open)
          
    }
    componentDidMount() {
       // logger.log('componentDidUpdate open')
      const {open}=this.props;
      //  this.setSavedFile();
        this.setState({ open: open })

       
    }



   

    render() {
       
        const { mediaFiles,selectedMediaFile } = this.props;

        const imageThumbs = mediaFiles.map(mediaFile => {
            const type = mediaFile.type
            if (type === 'image') {
                return (
                    <div style={thumb} key={mediaFile.file.name}>
                        <div style={thumbInner}>
                            <img
                                src={mediaFile.file.preview}
                                style={img}
                            />
                        </div>
                    </div>
                )
            }

        });

        const videoThumbs = mediaFiles.map(mediaFile => {
            const type = mediaFile.type
            if (type === 'video') {
                return (
                    <div style={thumb} key={mediaFile.file.name}>
                        <div style={thumbInner}>
                            <div style={{ position: 'relative', float: 'left' }}
                            onClick={() => this.setState({ open: true })} >
                                <img
                                    src={mediaFile.file.preview}
                                    style={img}
                                />
                               
                                    <img style={playIconImg} src={playIcon} />

                               
                            </div>
                        </div>
                    </div>
                )
            }

        });

      

        const dialog = <div>
           
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
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
                       {imageThumbs}
                       {videoThumbs}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                        Subscribe
            </Button>
                </DialogActions>
            </Dialog>
        </div>;




        return (
            <div>
                {dialog}
               
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

MediaViewField.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default ImgDropAndCrop

export default connect(null, mapDispatchToProps)(withStyles(styles)(MediaViewField));
