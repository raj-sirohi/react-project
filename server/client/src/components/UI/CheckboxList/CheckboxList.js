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
             private :{name :private, label: private label,...},
             intimate :{name :intimate, label: intimate label,...}
            }
         */
        this.props.checkboxArray.map((v, i) => {
            this.state[v.name] = v;
        })
    }

    componentDidUpdate() {
        this.props.onCheckboxClick({ ...this.state })
    }

    onChangeHandler = (name) => {
        const checkboxChanged = {...this.state[name]}
        checkboxChanged.value = !checkboxChanged.value;
        this.setState({ [name]:checkboxChanged})
    }

    renderCheckboxes = () => {
     /*
       state={ 
             private :{name :private, label: private label,...},
             intimate :{name :intimate, label: intimate label,...}
            }
     */
         // [ [{name :private, label: private label,...}] ,[ {name :intimate, label: intimate label,...}] ]
        const stateToArray = Object.entries(this.state).map(([k, v]) => ([v]));
        
        const checkBoxArray = stateToArray.map((checkboxName, i) => {
            // checkboxName = [{name :private, label: private label,...}]
            //checkboxName.pop() = {name :private, label: private label,...}
            const checkBoxItem = checkboxName.pop()

            var label = <label>{checkBoxItem.label}</label>
            if (!!checkBoxItem.icon){
                label = <label>{checkBoxItem.label} <Icon   name ='eye' color='red'></Icon> </label>
            }
           
            return (
                <Checkbox key={checkBoxItem.name}
                    style={{ marginTop: '1em' }}
                    name={checkBoxItem.name}
                    label={label}
                    checked={checkBoxItem.value}
                    onChange={() => this.onChangeHandler(checkBoxItem.name)} />
            )
        });
        return checkBoxArray;
    }
    render() {
        const { vertical = true } = this.props;
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
                        <label>Display Preferences</label>
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