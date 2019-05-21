import React, { Component } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import './ImagePreference.css';
import Logger from 'logger';
import { lang } from '../../../../node_modules/moment';

const logger = Logger('ImagePreference');

class ImagePreference extends Component {

    state = {

    }

    componentDidMount() {
      //  const languages = ["Private", "Intimate", "Inner", "Public"]
      const languages = [
        { name: 'private', label: 'private label', icon:'', value:false },
        { name: 'private', label: 'intimate label', icon:'', value:false },
        { name: 'private', label: 'inner label', icon:'', value:false },
        { name: 'private', label: 'public label', icon:'', value:false }
    ]
        languages.map((v, i) => {
            this.state[v.name] = v;
        })
    }

    componentDidUpdate() {
        this.props.onCheckboxClick({ ...this.state })
    }

    onChangeHandler = (name) => {
        const chekboxChanged = {...this.state[name],}
        this.setState({ [name]: !this.state[name] })


    }

    renderCheckboxes = () => {
       // const languages = ["Private", "Intimate", "Inner", "Public"]
       const languages = [
        { name: 'private', label: 'private label', icon:'', value:false },
        { name: 'intimate', label: 'intimate label', icon:'', value:false },
        { name: 'inner', label: 'inner label', icon:'', value:false },
        { name: 'public', label: 'public label', icon:'', value:false }
    ]
        const checkBoxArray = languages.map((checkboxName, i) => {
            return (
                <Checkbox key={checkboxName.name}
                    style={{ marginTop: '1em' }}
                    name={checkboxName.name}
                    label={checkboxName.label}
                    onChange={() => this.onChangeHandler(checkboxName.value)} />
            )

        });
        return checkBoxArray;
    }
    render() {
        const languages = ["Private", "Intimate", "Inner", "Public"]
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