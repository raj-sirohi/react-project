import React from 'react'
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react'
import './ThumbImage.css';
import Logger from 'logger';

const logger = Logger('ThumbImage');

export const ThumbImage = ({ file, clickImage, deleteImage, displayCloseIcon, ...props }) => {
    logger.log('thumbImage file', file)
    logger.log('thumbImage file.preview', file.preview)
    return (

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