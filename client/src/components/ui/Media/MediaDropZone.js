import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, Form } from 'semantic-ui-react';
import MediaThumbList from './MediaThumbList'
import Logger from 'logger';

const logger = Logger('MediaDropField');

const baseStyle = {
    width: 210,
    height: 220,
    borderWidth: 2,
    borderColor: '#dededf',
    borderStyle: 'dashed',
    //backgroundColor:'#cccccc',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column'

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


class MediaDropZone extends Component {

    state = {
        droppedFile: '',
        files: []
    }

    componentDidMount() {
        const { input } = this.props;
        input.onChange(this.state.files);
    }
    componentDidUpdate() {
        const { input } = this.props;
        input.onChange(this.state.files);
    }

    onDropHandler = (files) => {
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];
        const preview = URL.createObjectURL(droppedFile)
        const type = droppedFile.type.split('/')[0]
        const file = { file: droppedFile, type: type, preview: preview }
        this.setState({ droppedFile: file })
    }

    renderDropImage = () => {
        const { droppedFile } = this.state;
        if (!!droppedFile) {
            return (
                <div key={droppedFile.file.name} style={{ textAlign: 'center' }}>
                    <img
                        src={droppedFile.preview}
                        style={{ maxHeight: '180px', maxWidth: '200px', padding: '5px' }}
                    />
                </div>
            )
        }
    }

    dropZoneClearHandler = (e) => {
        e.stopPropagation();
        this.setState({ droppedFile: '' });
    }

    dropZoneAddHandler = (e) => {
        e.stopPropagation();
        const { droppedFile } = this.state;
        this.setState({ droppedFile: '', files: this.state.files.concat(droppedFile) })
        const { input } = this.props;
        input.onChange(this.state.files);

    }
    renderDropZone = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <section >
                        <div {...getRootProps()} style={baseStyle}>
                            <input {...getInputProps()} />
                            <div style={{ margin: 'auto' }}>
                                {isFileDropped && this.renderDropImage()}
                                {isFileDropped || <p style={{ color: '#c7c7c7', padding: '14px' }}>
                                    Drag 'n' drop some files here, or click to select files
                            </p>
                                }
                            </div>
                            <div>
                                {isFileDropped && <div style={{ marginBottom: '2px', textAlign: 'center' }}>
                                    <Button onClick={this.dropZoneAddHandler} content='Add' size='mini' primary />
                                    <Button onClick={this.dropZoneClearHandler} content='Cancel' size='mini' primary /></div>}
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
        )
    }
    render() {
        return (
            <Form.Field  >
                <label  >Test label</label>
                {this.renderDropZone()}
                <MediaThumbList files={this.state.files} />
            </Form.Field>
        )
    }
}

export default MediaDropZone
