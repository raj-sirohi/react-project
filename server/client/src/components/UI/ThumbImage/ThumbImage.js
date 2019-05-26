import React from 'react'
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react'
import './ThumbImage.css';
import Logger from 'logger';

const logger = Logger('ThumbImage');

export const ThumbImage = ({ file, clickImage, deleteImage, displayCloseIcon, ...props }) => {
    logger.log('file',file)
    return (
        <div className='thumb'>
            <img onClick={() => clickImage(file)}
                src={file.preview}
                className='thumb__image'
            />
            {displayCloseIcon && <Popup
                trigger={<span
                    onClick={() => deleteImage(file)}
                    className='thumb__closeIcon' ><Icon size='mini' inverted  name ={file.icon} color={file.iconColor}></Icon></span>}
                content={file.helpContent} />
            }
        </div>


      /*   <div className='thumb'>
            <img onClick={() => clickImage(file)}
                src={file.preview}
                className='thumb__image'
            />
            {displayCloseIcon && <Popup
                trigger={<span
                    onClick={() => deleteImage(file)}
                    className='thumb__closeIcon' >&times;</span>}
                content='Delete File' />
            }
        </div> */
    )
}

ThumbImage.propTypes = {
    file: PropTypes.object.isRequired,
    displayCloseIcon: PropTypes.bool,
    clickImage: PropTypes.func,
    deleteImage: PropTypes.func
};

ThumbImage.defaultProps = {
    displayCloseIcon: true,
    clickImage: () => { },
    deleteImage: () => { }
};