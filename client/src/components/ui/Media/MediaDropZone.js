import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button, Form } from 'semantic-ui-react';
import MediaThumbList from './MediaThumbList'
import MediaCarousel from './MediaCarousel'
import { TransitionablePortal, Grid, Segment, Image, Modal, Header } from 'semantic-ui-react'

import ModalContainer from '../modal/ModalContainer';
import ModalHeader from '../modal/ModalHeader';
import ModalBody from '../modal/ModalBody'
import ModalButtonPanel from '../modal/ModalButtonPanel';
import image from './image2.jpeg'
import * as loadImage from 'blueimp-load-image';
import * as Reactdom from 'react-dom';
import Logger from 'logger';

const logger = Logger('MediaDropField');

const baseStyle = {
    maxWidth: 210,

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

const DEFAULT_PROPS = {
    transition: {
        animation: "fade",
        duration: 1500
    }
};
class MediaDropZone extends Component {

    state = {
        droppedFile: '',
        files: [],
        open: false,
        base64: ''
    }

    imageCanvas;


    componentDidMount() {
        const { input } = this.props;
        input.onChange(this.state.files);

        /*   loadImage(image, (img) => {
              img.className = 'test'; // css class: { max-width: 100%; max-height: 100%; }
              Reactdom.findDOMNode(this.imageCanvas).appendChild(img);
              this.setState({base64:img.toDataURL()})
            //  logger.log('img.toDataURL()',img.toDataURL());
             const a= this.base64StringtoFile(img.toDataURL(),'t.jpeg');
              this.setState({ files: this.state.files.concat(a) })
              this.setState({
                  files: this.state.files.map(file => Object.assign(file, {
                      preview: URL.createObjectURL(file)
                  }))
              });
            
            },{orientation: true
             }); */
    }

    componentDidMount1() {
        const { input } = this.props;
        input.onChange(this.state.files);

        loadImage(image, (img, data) => {
            var orientation = data.exif.get('Orientation');
            logger.log("orientation: ", orientation);
            logger.log("Original image head: ", data.imageHead);
            logger.log("Exif data: ", data.exif); // requires exif extension
            logger.log("IPTC data: ", data.iptc); // requires iptc extension
            img.className = 'test'; // css class: { max-width: 100%; max-height: 100%; }
            Reactdom.findDOMNode(this.imageCanvas).appendChild(img);
            // logger.log('img',img)
            //  const imageData64 = img.toDataURL();
            //  logger.log('imageData64',imageData64);


        }, {
                orientation: true, canvas: false
            });
    }

    base64StringtoFile = (base64String, filename) => {
        var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
    }
    getOrgImage = () => {

        return (
            <div
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                ref={(ref) => this.imageCanvas = ref}
            />);

    }


    componentDidUpdate() {
        const { input } = this.props;
        input.onChange(this.state.files);
    }

    onDropHandler = (files) => {
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];
        logger.log('onDropHandler droppedFile', droppedFile.name);
        const fileName = droppedFile.name;
        const type = droppedFile.type.split('/')[0]

        loadImage(droppedFile, (img) => {
            img.className = 'test'; // css class: { max-width: 100%; max-height: 100%; }
            // Reactdom.findDOMNode(this.imageCanvas).appendChild(img);
            this.setState({ base64: img.toDataURL() })
            //  logger.log('img.toDataURL()',img.toDataURL());
            const newFile = this.base64StringtoFile(img.toDataURL(), fileName);
            const preview = URL.createObjectURL(newFile)

            const file = { file: newFile, type: type, preview: preview }
            this.setState({ droppedFile: file })



        }, {
                orientation: true
            });


    }

    onDropHandler1 = (files) => {
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];

        logger.log('onDropHandler')
        this.getBase64(droppedFile, (result) => {
            logger.log('idCardBase64', result)
            const idCardBase64 = result;
            this.setState({ base64: idCardBase64 })
            logger.log('idCardBase64', idCardBase64)
        });
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
                        style={{ maxHeight: '180px', maxWidth: '100%', padding: '5px' }}
                    />
                </div>
            )
        }
    }



    getBase64 = (file, cb) => {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            logger.log('Error: ', error);
        };
    }

    dropZoneClearHandler = (e) => {
        e.stopPropagation();
        this.setState({ droppedFile: '' });
    }

    dropZoneAddHandler = (e) => {
        e.stopPropagation();
        const { droppedFile } = this.state;
        const newStateFiles = this.state.files.slice();
        newStateFiles.unshift(droppedFile);

        this.setState({ droppedFile: '', files: newStateFiles })
        const { input } = this.props;
        input.onChange(this.state.files);

    }

    openModalHandler = (e) => {
        logger.log('openModalHandler')
        e.preventDefault();
        this.setState({ open: true })
    }
    onCloseModalHanlder = () => {
        this.setState({ open: false })
    }
    handleClose = (event, data) => {
        this.setOpen(false);
    };

    renderDropZone = () => {
        const { droppedFile } = this.state;
        const isFileDropped = !!droppedFile

        return (
            <Dropzone onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (

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

                )}
            </Dropzone>
        )
    }

    renderModal = () => {
        //console.log('renderModal',this.state.showModal);
        return (
            <ModalContainer show={this.state.open}  >
                <ModalHeader title="this is modal title"></ModalHeader>
                <ModalBody>
                    <p>this is my modal body</p>


                </ModalBody>
                <ModalButtonPanel>
                    <Button content='Add' primary />
                    <Button onClick={this.onCloseModalHanlder} content='Cancel' primary />
                </ModalButtonPanel>

            </ModalContainer>
        )
    }
    render() {
        logger.log('this.state.open', this.state.open)
        return (

         
              <div>
                  <Grid stackable columns={2}>
                      <Grid.Column mobile={16} tablet={5} computer={3}>
                          <Segment basic compact>
                              <label>Test label</label>
                              {this.renderDropZone()}
                          </Segment>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={11} computer={13}>
                          <Segment basic >
                              <MediaThumbList files={this.state.files} />
                          </Segment>
                          <Segment basic >
                              <MediaThumbList files={this.state.files} />
                          </Segment>
                      </Grid.Column>
                  </Grid>
                  {this.state.open && <MediaCarousel files={this.state.files} open={this.state.open} onClose={this.onCloseModalHanlder} />}
                  <Button content='open Modal' onClick={this.openModalHandler} />
              </div>

        )
    }
}

export default MediaDropZone
