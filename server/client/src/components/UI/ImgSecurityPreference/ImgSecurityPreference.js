import React, { Component } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import CheckboxList from '../CheckboxList/CheckboxList'
import './ImgSecurityPreference.css';
import Logger from 'logger';

const logger = Logger('ImgSecurityPreference');

class ImgSecurityPreference extends Component {

    state = { }

    componentWillMount() {
        const { imgSecurityPrefArray } = this.props;
        var secLevel = undefined;
        imgSecurityPrefArray.map((v) => {
            if (!!v.value) {
                secLevel = v.level;
            }
        });
        const updatedSecArray = imgSecurityPrefArray.map((v) => {
            if (!!secLevel) { // if there is security level defined
                if (v.level != secLevel) {
                    if (v.level > secLevel) {
                        v.disable = true;
                        v.value = true;
                    } else {
                        v.disable = true;
                        v.value = false;
                    }
                }
            }
            return v;
        });
        this.setState({ imgSecurityPrefArray: updatedSecArray })
    }

    checkboxClickHander = (checkboxList) => {
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

            } else {  // non clicked checkboxes

                if (!clickedValue) { // non clicked checkboxes if clicked =false
                    checkboxItem.disable = false;
                    checkboxItem.value = false;
                    return checkboxItem;
                } else { // non clicked checkboxes if clicked =true
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
        this.props.onImgSecCheckboxClick(updatedImgSecPrefArray);
        this.setState({ imgSecurityPrefArray: updatedImgSecPrefArray })
    }

    render() {
        const { imgSecurityPrefArray } = this.state;
        const { headerLabelColor } = this.props;
        logger.log('headerLabelColor',headerLabelColor)
        const { vertical } = this.props;

        return (
            <div  >
                <CheckboxList vertical={vertical} headerLabelColor={headerLabelColor} onCheckboxClick={this.checkboxClickHander}
                    checkboxArray={imgSecurityPrefArray} />
            </div>
        )
    }
}

export default ImgSecurityPreference;