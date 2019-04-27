import React, { Component } from 'react'
import { Popup, Header,Icon,Modal, Grid, Image,  Button, Transition, TransitionablePortal, Segment } from 'semantic-ui-react'
import Logger from 'logger';
import MediaThumbList from './MediaThumbList'

const logger = Logger('MediaCarousel');

const viewImageOuterWrapper = {
    border: '1px solid #c7c7c7',
    textAlign: 'center',
    padding: '1em',
    background: '#f1f1f1',
    // marginBottom:'1em',
    width: '70%',
    //  maxHeight: '28em',
    // minHeight:'26em'

}

const viewImageWrapper = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #bfbfbf',
    background: 'white',
    padding: '.4em',
    boxSizing: 'border-box',
}

const viewImg = {

    width: '100%',
    // maxWidth:'350px',
    height: 'auto',
    padding: '.4em',
    border: '1px solid #bfbfbf',
    borderRadius: 2,
    background: 'white'
}

const viewImg1 = {
    maxHeight: '25em',
    // height:'100%',
    maxWidth: '100%'

}
const wrapper = {

    border: '1px solid #c7c7c7',

    position: 'relative',
    // -webkit-border-radius: '5px',
    //-moz-border-radius: '5px',
    borderRadius: '5px',
    //marginBottom: '20px !important',
    // width: '80%',
    paddingTop: '.4em'
}
const scrolls = {
    overflowX: 'scroll',
    overflowY: 'hidden',

    minHeight: '6em',
    whiteSpace: 'nowrap'
}

const imageDiv = {
    //  margin: '0',
    // height: '80px',
    // width: '1200px'
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #bfbfbf',
    marginLeft: '.5em',

    background: 'white',
    padding: '.4em',
    boxSizing: 'border-box',

};
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const thumbImg = {
    maxHeight: '4em',

}

class MediaCarousel extends Component {

    state = {
        //  files: '',
        selectedFile: '',
        openDeleteModal: false,
        deleteFile: ''

    }

    deleteImageHandler = (file) => {
        this.setState({ deleteFile: file, openDeleteModal: true })

    }

    modalDeleteImageHandler = () => {
        const { deleteFile } = this.state;
        logger.log('modalDeleteImageHandler deleteFile', deleteFile)

        this.setState({ deleteFile: '', openDeleteModal: false })
        this.props.deleteImage(deleteFile)
    }

    onModalCloseHandler = () => {
        this.setState({ deleteFile: '', openDeleteModal: false })
    }

    renderDeleteConfModal = () => {
        const { openDeleteModal } = this.state;
        logger.log('renderDeleteConfModal', openDeleteModal)
        return (

            <TransitionablePortal open={openDeleteModal} transition={{ animation: 'fade up', duration: '300' }}>
                <Modal size='mini' open onClose={this.onModalCloseHandler}
                    closeOnDimmerClick={false} closeIcon>
                    <Modal.Header>Confirm Delete</Modal.Header>
                    <Modal.Content>
                        <Grid verticalAlign='middle' columns={2}>
                            <Grid.Column width={9} style={{paddingRight:0}}>
                               
                         
                            <div>
                            <Icon size ='large' color='red' name='delete' />
                            <span style={{fontSize:'1.2em'}}> delete this image? </span>
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

    getThumbImage = (file, clickHandler, deleteHandler) => {
        logger.log('getThumbImage file', file)
        return (
            <div className='thumb' key={file.name}>
                <div className='thumb__inner'>
                    <img onClick={() => clickHandler(file)}
                        src={file.preview}
                        className='thumbImage'
                    />
                </div>
                {/* <Popup
                    trigger={<span
                        onClick={() => deleteHandler(file.file)}
                        className='imageCloseIcon' >&times;</span>}
                    content='Delete File' /> */}
            </div>
        )
    }

    componentDidMount() {
        logger.log('componentDidmount')
        const { files, selectedFile } = this.props;
        if (Array.isArray(files) && files.length) {
            this.setState({ selectedFile })
        }

    }


    imageClickHandler = (file) => {
        logger.log('imageClickHandler file', file)
        if (!!file) {
            this.setState({ selectedFile: file })
        }
    }

    renderViewImage = () => {
        const { selectedFile } = this.state

        logger.log('renderViewImage selectedFile', selectedFile)
        this.isSelectedImageInList();
        return (
            <div>
                {
                    this.isSelectedImageInList() && selectedFile && <div style={viewImageOuterWrapper}>

                        <img
                            src={this.state.selectedFile.preview}
                            style={viewImg}
                        />

                    </div>
                }
            </div>
        )
    }

    isSelectedImageInList = () => {
        const { selectedFile } = this.state;
        const { files } = this.props;
        logger.log('isSelectedImageInList files', files)
        // if (Array.isArray(files) && files.length) {

        if (!!selectedFile) {
            const fileArrayWithSelectedFile = files.filter(value => {
                if (value.file.name === selectedFile.file.name) {
                    return true;
                }
            })

            // logger.log('isSelectedImageInList',fileArrayWithSelectedFile.length)

            if (fileArrayWithSelectedFile.length === 0) {
                logger.log('isSelectedImageInList AAAAA')
                //  this.setState({ selectedFile: '' })
                logger.log('isSelectedImageInList BBBB')
            }

            return fileArrayWithSelectedFile.length > 0;
        }

        return false;
        // }

    }

    getThumbImages = () => {
        const { files } = this.state;
        logger.log('files', files);
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                const type = file.type
                // const preview = URL.createObjectURL(file)
                // if (type === 'image') {
                return (
                    <div onClick={() => this.imageClickHandler(file)} style={thumb} key={file.file.name}>
                        <div style={thumbInner}>
                            <img
                                src={file.preview}

                                style={thumbImg}
                            />
                        </div>
                    </div>
                )
                // }
            });
        }
        return false;
    }

    close = () => this.setState({ open: false })

    renderThumbImages = () => {
        return (
            <div style={wrapper}>
                <div style={scrolls}>
                    <div style={imageDiv}>
                        {this.getThumbImages()}

                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { open, onClose, files, deleteImage } = this.props;
        logger.log('render open', open)
        return (



            <Modal open={open} onClose={onClose}

                closeOnDimmerClick={false} closeIcon>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content scrolling>
                    {this.renderViewImage()}
                </Modal.Content>
                <Modal.Content style={{ paddingTop: 0 }} >

                    {/* {this.renderThumbImages()} */}
                    <MediaThumbList files={files} clickImage={this.imageClickHandler}
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

export default MediaCarousel