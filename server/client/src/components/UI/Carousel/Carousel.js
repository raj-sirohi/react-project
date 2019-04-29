import React, { Component } from 'react'
import { Icon, Modal, Grid,  Button,  TransitionablePortal} from 'semantic-ui-react'
import ThumbList from '../ThumbList/ThumbList'
import { ThumbImage } from '../ThumbImage/ThumbImage'
import './Carousel.css'
import Logger from 'logger';

const logger = Logger('Carousel');

class Carousel extends Component {

    state = {
        selectedFile: '',
        openDeleteModal: false,
        deleteFile: ''
    }
    componentDidMount() {
        const { files, selectedFile } = this.props;
        if (Array.isArray(files) && files.length) {
            this.setState({ selectedFile })
        }
    }

    imageClickHandler = (file) => {
        if (!!file) {
            this.setState({ selectedFile: file })
        }
    }

    deleteImageHandler = (file) => {
        this.setState({ deleteFile: file, openDeleteModal: true })
    }

    modalDeleteImageHandler = () => {
        const { deleteFile } = this.state;
        this.setState({ deleteFile: '', openDeleteModal: false })
        this.props.deleteImage(deleteFile)
    }

    onModalCloseHandler = () => {
        this.setState({ deleteFile: '', openDeleteModal: false })
    }

    renderDeleteConfModal = () => {
        const { openDeleteModal } = this.state;
        return (
            <TransitionablePortal open={openDeleteModal} transition={{ animation: 'fade up', duration: '300' }}>
                <Modal size='mini' open onClose={this.onModalCloseHandler}
                    closeOnDimmerClick={false} closeIcon>
                    <Modal.Header>Confirm Delete</Modal.Header>
                    <Modal.Content>
                        <Grid verticalAlign='middle' columns={2}>
                            <Grid.Column width={9} style={{ paddingRight: 0 }}>
                                <div>
                                    <Icon size='large' color='red' name='delete' />
                                    <span style={{ fontSize: '1.2em' }}> delete this image? </span>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                {this.getThumbImage(this.state.deleteFile, () => false, () => false)}
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={this.modalDeleteImageHandler}>
                            Yes
                        </Button>
                        <Button
                            secondary
                            content="No"
                            onClick={this.onModalCloseHandler}
                        />
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        )
    }

    getThumbImage = (file) => {
        return (
            <ThumbImage displayCloseIcon={false} file={file}
            />
        )
    }

    renderViewImage = () => {
        const { selectedFile } = this.state
        return (
            <div>
                {
                    this.isSelectedImageInList() && selectedFile && <div 
                    className='imgOuterWrapper'>
                        <img
                            src={this.state.selectedFile.preview}
                            className='imgOuterWrapper__img'
                        />
                    </div>
                }
            </div>
        )
    }

    isSelectedImageInList = () => {
        const { selectedFile } = this.state;
        const { files } = this.props;
        if (!!selectedFile) {
            const fileArrayWithSelectedFile = files.filter(value => {
                if (value.file.name === selectedFile.file.name) {
                    return true;
                }
            })
            return fileArrayWithSelectedFile.length > 0;
        }
        return false;
    }

    render() {
        const { open, onClose, files, deleteImage } = this.props;
        return (
            <Modal open={open} onClose={onClose}
                closeOnDimmerClick={false} closeIcon>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content scrolling>
                    {this.renderViewImage()}
                </Modal.Content>
                <Modal.Content style={{ paddingTop: 0 }} >
                    <ThumbList files={files} clickImage={this.imageClickHandler}
                        deleteImage={this.deleteImageHandler} />
                    {this.state.openDeleteModal && this.renderDeleteConfModal()}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={onClose}>
                        OPen inner
                            </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Yep, that's me"
                        onClick={onClose}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default Carousel