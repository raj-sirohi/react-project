import React, { Component } from 'react'
import { Image, Icon, Popup, Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { ThumbImage } from '../ThumbImage/ThumbImage'
import './ThumbList.css'
import Logger from 'logger';
const logger = Logger('ThumbList');

class ThumbList extends Component {

    getThumbImages = () => {
        const { files, clickImage, deleteImage } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                logger.log('getThumbImages file.preview',file.preview)
                const type = file.type
                if (type === 'image') {
                    return(
                        <React.Fragment key={file.file.name}>
                     <ThumbImage file={file} />
                    </React.Fragment>
                         )
                }
            });
        }
        return false;
    }

    getThumbImages2 = () => {
        const { files, clickImage, deleteImage } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                logger.log('getThumbImages file.preview',file.preview)
                const type = file.type
                if (type === 'image') {
                    return(
                        <React.Fragment key={file.file.name}>
                          
                        <div className='thumb'>
                       
                            <img onClick={() => clickImage(file)}
                                src={file.preview}
                                className='thumbImage'
                            />
                      
                        <Popup
                            trigger={<span
                                onClick={() => deleteImage(file)}
                                className='imageCloseIcon' >&times;</span>}
                            content='Delete File' />
                    </div>
                    </React.Fragment>
                         )
                }
            });
        }
        return false;
    }

    getThumbImages1 = () => {
        const { files, clickImage, deleteImage } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                logger.log('getThumbImages file',file)
                const type = file.type
                if (type === 'image') {
                    return this.getThumbImage(file, clickImage, deleteImage);
                }
            });
        }
        return false;
    }

   

    getThumbImage = (file, clickHandler, deleteHandler) => {
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
                        onClick={() => deleteHandler(file)}
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

ThumbList.propTypes = {
    files: PropTypes.array.isRequired,
    clickImage: PropTypes.func,
    deleteImage: PropTypes.func
};

ThumbList.defaultProps = {
    clickImage: () => { },
    deleteImage: () => { }
};

export default ThumbList;