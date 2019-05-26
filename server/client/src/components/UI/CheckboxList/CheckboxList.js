/*
props:
headerLabelColor :'#000000de' (Default)
checkboxArray=[
    {name: 'private', label: 'private label',labelColor:'red', icon:'user',iconColor:'red', value:false,disable:false },
    {name: 'public', label: 'public label',labelColor:'red' icon:'eye',iconColor:'red', value:false,disable:false }
]

callback function:
onCheckboxClick={somefunction}

someFunction will be invoked with checkboxArray

*/

import React, { Component } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import './CheckboxList.css';
import Logger from 'logger';

const logger = Logger('CheckboxList');

class CheckboxList extends Component {
    state = {
    }

    componentWillMount() {
        /*
        state={ 
             checkboxArray: [
                 {name: 'private', label: 'private label', icon:'user',iconColor:'red', value:false,disable:false },
                 {name: 'public', label: 'public label', icon:'eye',iconColor:'red', value:false,disable:false }
 ]               ]
             }
          */

        this.setState({ checkboxArray: this.props.checkboxArray });
    }

    onChangeHandler = (name) => {

        const updatedcheckboxArray = this.state.checkboxArray.map((v) => {
            v.clicked = false;
            if (v.name === name) {
                v.clicked = true;
                v.value = !v.value;
            }
            return v;
        });

        this.props.onCheckboxClick([...updatedcheckboxArray]);
        this.setState({ checkboxArray: updatedcheckboxArray })
    }

    renderCheckboxes = () => {
       
        const checkBoxList = this.state.checkboxArray.map((checkboxItem, i) => {
            const {labelColor='#000000de'}= checkboxItem;

            var disable = false;
            if (!!checkboxItem.disable) {
                disable = checkboxItem.disable;
            }
            var label = <label>{checkboxItem.label}</label>
            if (!!checkboxItem.icon) {
                label = <label>
                    <span style={{color:labelColor}}>
                {checkboxItem.label} 
                <Icon name={checkboxItem.icon} color={checkboxItem.iconColor} />
                </span>
                </label>
            }

            return (
                <Checkbox key={checkboxItem.name}
                    style={{ marginTop: '1em' }}
                    name={checkboxItem.name}
                    label={label}
                    checked={checkboxItem.value}
                    disabled={disable}
                    onChange={() => this.onChangeHandler(checkboxItem.name)}
                />
            )
        });
        return checkBoxList;
    }
    render() {
       
        const {headerLabelColor='#000000de', vertical = true } = this.props;
        const className = vertical ? 'checkbox-list--full-width' : ['checkbox-list--full-width', 'checkbox-list--horizontal'].join(" ");

        const checkboxClassArray = [];
        checkboxClassArray.push('checkbox-list__checkbox');
        if (vertical) {
            checkboxClassArray.push('checkbox-list__checkbox--vertical');
        }
        else {
            checkboxClassArray.push('checkbox-list__checkbox--horizontal');
        }
        const checkboxClass = checkboxClassArray.join(" ");
        return (
            <div className='checkbox-list'>
                <div className={className}>
                    <div className='checkbox-list__title'>
                        <label>  <span style={{color:headerLabelColor}}>Display Preferences</span> </label>
                    </div>
                    <div className={checkboxClass}>
                        {this.renderCheckboxes()}

                    </div>
                </div>
            </div>
        )
    }
}
export default CheckboxList;

//favourite color