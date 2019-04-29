import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import classNames from 'classnames'
import Dropzone from 'react-dropzone'
//import request from "superagent";
import ReactCrop from 'react-image-crop'
//import './custom-image-crop.css';
import 'react-image-crop/dist/ReactCrop.css';
const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};
const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

class ImgDropAndCrop extends Component {
    constructor() {
        super()
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
    }

    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    render() {
        const { files } = this.state;

        const thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));

        return (
            <section>
                <Dropzone accept="image/*"
                    onDrop={this.onDrop.bind(this)}>
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                        let styles = { ...baseStyle }
                        styles = isDragActive ? { ...styles, ...activeStyle } : styles
                        styles = isDragReject ? { ...styles, ...rejectStyle } : styles

                        return (
                            <div
                                {...getRootProps()}
                                style={styles}
                            >
                                <input {...getInputProps()} />
                                <div>
                                    {isDragAccept ? 'Drop' : 'Drag'} files here...
                                 </div>
                                {isDragReject && <div>Unsupported file type...</div>}
                            </div>
                        )
                    }}
                </Dropzone>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </section>
        );
    }
}

export default ImgDropAndCrop