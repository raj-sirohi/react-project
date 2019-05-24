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

       //  this.setState({checkboxArray:this.props.checkboxArray});
    //   logger.log('this.props.checkboxArray',this.props.checkboxArray)
      this.setState({checkboxArray:this.props.checkboxArray});
        /* this.props.checkboxArray.map((v, i) => {
            v.clicked=false;
            this.state[v.name] = v;
        }) */
    }

    componentDidUpdate() {
    //  const imagePreferenceArray = Object.entries(this.state).map(([k, v]) => (v));
    //     this.props.onCheckboxClick(imagePreferenceArray);
    }

    onChangeHandler = (name) => {
       
      //  logger.log('onChangeHandler this.state',{...this.state});

        const updatedcheckboxArray =  this.state.checkboxArray.map((v) => {
            v.clicked=false;
            if (v.name===name){
                v.clicked=true; 
                v.value = !v.value;
            }

            return v;
        });
       // logger.log('onChangeHandler updatedcheckboxArray',updatedcheckboxArray)

        this.props.onCheckboxClick([...updatedcheckboxArray]);
        this.setState({checkboxArray:updatedcheckboxArray})

    /*    const clickedCheckbox= checkboxArrayFromState.filter((v)=>{
            if (v.name=name){
                return v
            }

        })
        var checkboxChanged = {...this.state[name]}
     
        checkboxChanged.value= !checkboxChanged.value;
        checkboxChanged.clicked=true;
       
      
       var newUpdateCheckbox = {};
     
        newUpdateCheckbox[name]={...checkboxChanged}
       // logger.log('onChangeHandler newUpdateCheckbox',newUpdateCheckbox);
        const updatedCheckboxArray = {...this.state,...newUpdateCheckbox};
        const checkboxArray = Object.entries(updatedCheckboxArray).map(([k, v]) => (v));
        
        this.props.onCheckboxClick([...checkboxArray]);

        this.setState({...this.state,...newUpdateCheckbox}) */

    }

    renderCheckboxes = () => {
     /*
       state={ 
             private :{name :private, label: private label,...},
             intimate :{name :intimate, label: intimate label,...}
            }
     */
         // [ {name :private, label: private label,...} , {name :intimate, label: intimate label,...} ]
      //  const checkboxArray =  Object.entries(this.state).map(([k, v]) => (v));
        
        const checkBoxList = this.state.checkboxArray.map((checkboxItem, i) => {
           // logger.log('renderCheckboxes checkboxItem',checkboxItem)
            var disable=false;
          if (!!checkboxItem.disable){
            disable=checkboxItem.disable;
          }
           

            var label = <label>{checkboxItem.label}</label>
            if (!!checkboxItem.icon){
                label = <label>{checkboxItem.label} <Icon   name ='eye' color='red'></Icon> </label>
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