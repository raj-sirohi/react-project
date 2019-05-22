import React, { Component } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import './ImagePreference.css';
import Logger from 'logger';

const logger = Logger('ImagePreference2');

class ImagePreference extends Component {

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
                label = <label>{checkBoxItem.label} <Icon circular size='tiny' inverted name ='user' color='blue'></Icon> </label>
            }
           
            return (
                <Checkbox key={checkBoxItem.name}
                    style={{ marginTop: '1em' }}
                    name={checkBoxItem.name}
                    // label={checkBoxItem.label}
                    label={label}
                    checked={checkBoxItem.value}
                    onChange={() => this.onChangeHandler(checkBoxItem.name)} />
            )
        });
        return checkBoxArray;
    }
    render() {
        const { vertical = true } = this.props;
        const className = vertical ? 'image-preference' : ['image-preference', 'image-preference--horizontal'].join(" ");

        const checkboxClassArray = [];
        checkboxClassArray.push('image-preference__checkbox');
        if (vertical) {
            checkboxClassArray.push('image-preference__checkbox--vertical');
        }
        else {
            checkboxClassArray.push('image-preference__checkbox--horizontal');
        }
        const checkboxClass = checkboxClassArray.join(" ");
        return (
            <div className='image-preference-wrapper'>
                <div className={className}>
                    <div className='image-preference__title'>
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
export default ImagePreference;