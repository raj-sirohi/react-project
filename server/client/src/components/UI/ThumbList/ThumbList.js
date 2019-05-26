import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ThumbImage } from '../ThumbImage/ThumbImage'
import './ThumbList.css'
import Logger from 'logger';

class ThumbList extends Component {

    getThumbImages = () => {
        const { files,icon,iconColor,helpContent, clickImage, deleteImage } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                const type = file.type
                if (type === 'image') {
                    return (
                        <React.Fragment key={file.file.name}>
                            <ThumbImage file={file}
                            icon={icon}
                            iconColor={iconColor}
                            helpContent={helpContent}
                                deleteImage={() => deleteImage(file)}
                                clickImage={() => clickImage(file)} />
                        </React.Fragment>
                    )
                }
            });
        }
        return false;
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