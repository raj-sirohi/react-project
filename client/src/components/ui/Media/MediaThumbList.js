import React,{Component} from 'react'
import Logger from 'logger';

const logger = Logger('MediaView');

/* .wrapper { 
    background:#EFEFEF; 
    box-shadow: 1px 1px 10px #999; 
    margin: auto; 
    text-align: center; 
    position: relative;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-bottom: 20px !important;
    width: 800px;
    padding-top: 5px;
}
.scrolls { 
    overflow-x: scroll;
    overflow-y: hidden;
    height: 80px;
white-space:nowrap
} 
.imageDiv img { 
    box-shadow: 1px 1px 10px #999; 
    margin: 2px;
    max-height: 50px;
    cursor: pointer;
display:inline-block;
*display:inline;
*zoom:1;
vertical-align:top;
} */

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #bfbfbf',
    marginBottom: 8,
    marginRight: 8,
   // width: '3em',
    maxHeight: '4em',
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
  //  width: '100px', //'auto',
  maxHeight: '4em', //'100%'
    float:'left'
};
class MediaThumbList extends Component{

    renderThumbImage = () => {
        const {files}=this.props;
        logger.log('files',files);
        if (Array.isArray(files) && files.length){
            return files.map(file => {
         
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
        }
       

        return false;
    }

    render(){

        const {files}= this.props
        return(
            <div  style={{overflow: 'auto', maxWidth: '240px', maxHeight:'200px' }}>
             <div 
             //style={{width: '500px'}}
             > 
                {this.renderThumbImage()}

            </div>
            </div>

        )
    }
}

export default MediaThumbList;