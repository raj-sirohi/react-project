import React, { Component } from 'react'
import Logger from 'logger';
import { Image, Icon, Popup,Button ,Modal,TransitionablePortal} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './Media.css'

const logger = Logger('MediaThumbList');

class MediaThumbList extends Component {

   /*  state = {
        openDeleteModal: false,
        deleteFile:''
    }

    deleteImageHandler = (file) => {
        this.setState({deleteFile:file,openDeleteModal:true})
    }

    modalDeleteImageHandler=()=>{
        const{deleteFile}= this.state;
        logger.log('modalDeleteImageHandler deleteFile')
       
        this.setState({deleteFile:'',openDeleteModal:false})
        this.props.deleteImage(deleteFile.name)
    }

    onModalCloseHandler=()=>{
        this.setState({deleteFile:'',openDeleteModal:false})
    }

    renderDeleteConfModal = () => {
        const {openDeleteModal}= this.state;
        logger.log('renderDeleteConfModal',openDeleteModal)
        return (
            
            <TransitionablePortal open={openDeleteModal} transition={{ animation: 'fade up', duration: '300' }}>
                <Modal open onClose={this.onModalCloseHandler}
                    closeOnDimmerClick={false} closeIcon>
                    <Modal.Header>Confirm Delete</Modal.Header>
                    <Modal.Content scrolling>
                        Delete this image?
                </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.modalDeleteImageHandler}>
                            Delete
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Cancel"
                            onClick={this.onModalCloseHandler}
                        />
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        )
    } */

   
    getThumbImages = () => {
        const { files, clickImage,deleteImage } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                const type = file.type
                if (type === 'image') {
                    return  this.getThumbImage(file,clickImage,deleteImage);
                }
            });
        }
        return false;
    }

    getThumbImage=(file,clickHandler,deleteHandler)=>{
        return (
            <div className='thumb' key={file.file.name}>
                <div className='thumb__inner'>
                    <img onClick={() => clickHandler(file)}
                        src={file.preview}
                        className='thumbImage'
                    />
                </div>
                <Popup
                    trigger={<span 
                        onClick={()=>deleteHandler(file)}
                        className='imageCloseIcon' >&times;</span>}
                    content='Delete File' />
            </div>
        )
    }

    renderThumbImages = () => {
        return (
            <div className='wrapper'>
                <div className='wrapper__scrolls'>
                    {this.getThumbImages()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <label>selected Pic </label>
                {this.renderThumbImages()}
            </React.Fragment >
        )
    }
}

MediaThumbList.propTypes = {
    files:PropTypes.array.isRequired,
    clickImage: PropTypes.func,
    deleteImage: PropTypes.func
  };

  MediaThumbList.defaultProps = {
    clickImage: ()=>{},
    deleteImage: ()=>{}
  };

export default MediaThumbList;