import React, { Component } from 'react'
import { Modal, Image,Header, Button, Transition, TransitionablePortal } from 'semantic-ui-react'
import Logger from 'logger';

const logger = Logger('MediaCarousel');

const viewImageOuterWrapper = {
    border: '1px solid #c7c7c7',
    textAlign:'center',
    padding:'1em',
    background:'#f1f1f1',
    width:'80%',
    marginBottom:'1em',
    maxHeight: '28em',
   // minHeight:'26em'
    
}

const viewImageWrapper ={
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #bfbfbf',
  
  
    background: 'white',
    padding: '.4em',
    boxSizing: 'border-box',  
}

const viewImg = {
    maxHeight: '25em',
   // height:'100%',
    width:'auto'

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
    // marginBottom: 8,
    // marginRight: 8,
    // width: '3em',
    // maxHeight: '4.4em',
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
        files: '',
        selectedFile: ''
    }

    componentDidMount() {
        logger.log('componentWillmount')
        const { files, selectedFile } = this.props;
        if (Array.isArray(files) && files.length) {
            this.setState({ files, selectedFile })
        }

    }
    componentWillUnmount() {
        logger.log('componentWillUnmount')
    }

    imageClickHandler = (file) => {
        if (!!file) {
            this.setState({ selectedFile: file })
        }
    }

    renderViewImage = () => {
        const { selectedFile } = this.state
        return (
            <div>
            {
                selectedFile && <div style={viewImageOuterWrapper}>
                <div style={viewImageWrapper}>
                    <img
                        src={this.state.selectedFile.preview}
                        style={viewImg}
                    />
                    </div>
                </div>
            }
            </div>
        )
    }

    renderViewImage1 = () => {
        const { selectedFile } = this.state
        return (
            <div>
            {
                selectedFile && <div style={viewImageOuterWrapper}>
                <div style={viewImageWrapper}>
                    <img
                        src={this.state.selectedFile.preview}
                        style={viewImg}
                    />
                    </div>
                </div>
            }
            </div>
        )
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
        const { open, onClose, files } = this.props;
        return (

            <TransitionablePortal open={open} transition={{ animation: 'fade up', duration: '300' }}>

                <Modal open onClose={onClose}

                    closeOnDimmerClick={false} closeIcon>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content >
                        {this.renderViewImage()}
                        {this.renderThumbImages()}
                       


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={onClose}>
                            Nope
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


            </TransitionablePortal>

        )
    }
}

export default MediaCarousel