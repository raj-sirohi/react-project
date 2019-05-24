import React, { Component } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import CheckboxList from '../CheckboxList/CheckboxList'
import './ImgSecurityPreference.css';
import Logger from 'logger';

const logger = Logger('ImgSecurityPreference');

class ImgSecurityPreference extends Component {

    state = {

    }

    componentWillMount() {
        const {imgSecurityPrefArray} = this.props;
        logger.log('componentWillMount imgSecurityPrefArray ', imgSecurityPrefArray);
        var secLevel=undefined;
        imgSecurityPrefArray.map((v)=>{
            if (!!v.value){
                secLevel= v.level;
            }
        });
       // logger.log('componentWillMount secLevel ', secLevel);
      const updatedSecArray=  imgSecurityPrefArray.map((v)=>{
          if (v.level != secLevel){
            if (v.level> secLevel){
                v.disable=true;
                v.value=true;
            }else{
                v.disable=true;
                v.value=false;
            }
          }
          
            return v;
        });
      //  logger.log('componentWillMount updatedSecArray ', updatedSecArray);
        this.setState({ imgSecurityPrefArray: updatedSecArray })
    }

    checkboxClickHander = (checkboxList) => {
     //   logger.log('checkboxClickHandler', checkboxList);
        var clickedLevel = undefined;
        var clickedValue = undefined;
        checkboxList.map((checkboxItem, i) => {
            if (checkboxItem.clicked) {
                clickedLevel = checkboxItem.level;
                clickedValue = checkboxItem.value;
            }
        });
        const updatedImgSecPrefArray = checkboxList.map((checkboxItem, i) => {

            if (checkboxItem.clicked) {
                
                    checkboxItem.disable = false;
                    return checkboxItem;
                
                }else{  // non clicked checkboxes

                    if (!clickedValue) { // non clicked checkboxes if clicked =false
                        checkboxItem.disable = false;
                        checkboxItem.value = false;
                        return checkboxItem;
                    }else{ // non clicked checkboxes if clicked =true
                        if (checkboxItem.level > clickedLevel) {
                            checkboxItem.disable = true;
                            checkboxItem.value = true;
                            return checkboxItem;
                        } else {
                            checkboxItem.disable = true;
                            checkboxItem.value = false;
                            return checkboxItem;
                        }
                    }
                }

                });
      //  logger.log('updatedImgSecPrefArray', updatedImgSecPrefArray)
        this.props.onImgSecCheckboxClick(updatedImgSecPrefArray);
        this.setState({ imgSecurityPrefArray: updatedImgSecPrefArray })
    }


    render() {
        const { imgSecurityPrefArray } = this.state;
        const {vertical}= this.props;
       /*  var vertical =false;
       if (!!vertical){
        vertical=true;
       } */

        return (
            <div  >
                <CheckboxList vertical={vertical} onCheckboxClick={this.checkboxClickHander}
                    checkboxArray={imgSecurityPrefArray} />
            </div>
        )
    }

}

export default ImgSecurityPreference;