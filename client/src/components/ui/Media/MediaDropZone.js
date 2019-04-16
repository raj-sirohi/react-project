import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'semantic-ui-react';
import Logger from 'logger';

const logger = Logger('MediaDropField');

const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5,
    display:'flex',
    flexDirection:'column'

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

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100px',
    height: '100px',
    padding: 4,
    boxSizing: 'border-box',

};



const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: '100px', //'auto',
    height: '100px' //'100%'
};
class MediaDropZone extends Component {

    state = {
        droppedFile:'',
        files: []
    }

    onDropHandler = (files) => {

        logger.log('onDropHandler files', files);
        //image/jpeg
        //video/mp4
        const droppedFile = files[0];
        const preview = URL.createObjectURL(droppedFile)
        const type = droppedFile.type.split('/')[0]
        const file ={file:droppedFile,type:type,preview:preview}
        this.setState({droppedFile:file,   files:this.state.files.concat(file)})
        /* this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        }); */
    }

    renderDropImage = () => {
        const {droppedFile} = this.state;
        if (!!droppedFile)
        {
            return (
                <div  key={droppedFile.file.name}>
                <div style={{borderColor:'red', textAlign:'center'}}>
                    <img
                        src={droppedFile.preview}
                        style={{maxHeight:'200px',maxWidth:'200px'}}
                    />
                </div>
            </div>
            )  
        }
        // const imageThumbs = this.state.files.map(file => {
        //      logger.log('renderThumbImage file',file.file.name);
        //     const type = file.type
        //     if (type === 'image') {
        //         return (
        //             <div  key={file.file.name}>
        //             <div style={{borderColor:'red', textAlign:'center'}}>
        //                 <img
        //                     src={file.preview}
        //                     style={{maxHeight:'200px',maxWidth:'200px'}}
        //                 />
        //             </div>
        //         </div>
        //         )
        //     }

        // });

        
    }

    renderThumbImage = () => {
        const imageThumbs = this.state.files.map(file => {
             logger.log('renderThumbImage file',file.file.name);
            const type = file.type
            if (type === 'image') {
                return (
                    <div style={thumb} key={file.file.name}>
                    <div style={thumbInner}>
                        <img
                            src={file.preview}
                            style={img}
                        />
                    </div>
                </div>
                )
            }

        });

        return imageThumbs;
    }

    renderDropZone = () => {
        const {droppedFile}=this.state;
        const isFileDropped = !!droppedFile
        logger.log('isFileDropped',isFileDropped || 'aaa')
        return (
            <Dropzone onDrop={(files) => this.onDropHandler(files)}>
                {({ getRootProps, getInputProps }) => (
                    <section >
                        <div {...getRootProps()} style={baseStyle}>
                          <input {...getInputProps()} />
                          <div style={{margin:'auto'}}>
                          {isFileDropped && this.renderDropImage()}
                          </div>
                           
                            {isFileDropped ||  <p>Drag 'n' drop some files here, or click to select files</p>}
                            <div>
                           
                           {isFileDropped &&   <div style={{marginBottom:'2px',textAlign:'center'}}><Button content='Primary' size='mini' primary />
                           <Button content='Primary' size='mini' primary /></div>}
                       </div>
                        </div>
                       
                    </section>
                )}
            </Dropzone>
        )
    }
    render() {

        return (
            <React.Fragment>
                {this.renderDropZone()}
                {this.renderThumbImage()}
               
            </React.Fragment>

        )
    }
}

export default MediaDropZone
