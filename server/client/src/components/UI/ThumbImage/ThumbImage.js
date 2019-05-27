import React from 'react'
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react'
import './ThumbImage.css';
import Logger from 'logger';

const logger = Logger('ThumbImage');

export const ThumbImage = ({ file, clickImage,clickIcon, displayIcon, ...props }) => {
    logger.log('file.preview',file)
    return (
        <div className='thumb'>
            <img onClick={() => clickImage(file)}
                src={file.preview}
                className='thumb__image'
            />
            {displayIcon && <Popup
                trigger={<span
                    onClick={() => clickIcon(file)}
                    className='thumb__icon' ><Icon size='mini' inverted  name ={file.icon} color={file.iconColor}></Icon></span>}
                content={file.helpContent} />
            }
        </div>
    )
}

ThumbImage.propTypes = {
    file: PropTypes.object.isRequired,
    displayIcon: PropTypes.bool,
    clickImage: PropTypes.func,
    clickIcon: PropTypes.func
};

ThumbImage.defaultProps = {
    displayIcon: true,
    clickImage: () => { },
    clickIcon: () => { }
};