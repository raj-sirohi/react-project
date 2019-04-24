import React,{Component} from 'react'
import Logger from 'logger';
import {Image,Icon} from 'semantic-ui-react'

const logger = Logger('MediaThumbList');


const wrapper = {

    border: '1px solid #c7c7c7',
   

    position: 'relative',
    WebkitBorderRadius: '5px',
    MozBorderRadius: '5px',
    borderRadius: '5px',
   
    paddingTop: '.4em'
}
const scrolls = {
    overflowX: 'scroll',
    overflowY: 'hidden',
    display:'flex',
    height: '6em',
    whiteSpace: 'nowrap'
}


//***************************************** */

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #bfbfbf',
    marginLeft:'.5em',
 
    background:'white',
  padding: '.4em',
    boxSizing: 'border-box',

};
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    
}

const thumbImg={
 maxHeight: '4em',


}

const close= {
    position: 'absolute',
    top: 0,
    right: 0
  }

class MediaThumbList extends Component{

   

    getThumbImages = () => {
        const {files}=this.props;
        logger.log('files',files);
        if (Array.isArray(files) && files.length){
            return files.map(file => {
         
                const type = file.type
                if (type === 'image') {
                    return (
                        <div>
                        <div style={thumb} key={file.file.name}>
                        <div style={thumbInner}>
                            <img
                                src={file.preview}
                                style={thumbImg}
                            />
                            <Icon style={close} name='times circle'  color='red' />
                        </div>
                       
                        </div>
                       
                    </div>
                    )
                }
    
            });
        }
       

        return false;
    }

    renderThumbImages = () => {
        return (
            <div style={wrapper}>
                <div style={scrolls}>
                   
                        {this.getThumbImages()}

                  
                </div>
            </div>
        )
    }

    render(){

        const {files}= this.props
        return(
          
             <React.Fragment 
            
             > 
             <label>selected Pic </label>
                {this.renderThumbImages()}

            </React.Fragment >
        )
    }
}

export default MediaThumbList;