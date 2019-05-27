import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ThumbImage } from '../ThumbImage/ThumbImage'
import './ThumbList.css'
import Logger from 'logger';

const logger =Logger('ThumbList');

class ThumbList extends Component {

    getThumbImages = () => {
        const { files, clickImage, clickIcon } = this.props;
        if (Array.isArray(files) && files.length) {
            return files.map(file => {
                logger.log('file',file)
                //const type = file.type
                //const type = currentFile.type.split('/')[0]
                //if (type === 'image') {
                    return (
                        <React.Fragment key={file.name}>
                            <ThumbImage file={file}
                            icon={file.icon}
                            iconColor={file.iconColor}
                            helpContent={file.helpContent}
                            clickIcon={() => clickIcon(file)}
                            clickImage={() => clickImage(file)} />
                        </React.Fragment>
                    )
              //  }
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