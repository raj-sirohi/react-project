import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import {DateInput } from 'semantic-ui-calendar-react';

class DateCustom extends Component {
    render() {
        const {input}= this.props;
        console.log('DateCustom props', this.props);
        console.log('DateCustom input', input);
        return (
            <React.Fragment>
                <DateInput
                    {...this.props}
                    onChange={this.props.onChange}
                    
                   
                   
                />
            </React.Fragment>
        )
    }
}
export default DateCustom;