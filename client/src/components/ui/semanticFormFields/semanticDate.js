import React, { Component } from 'react';
import moment from 'moment'
import { Header } from 'semantic-ui-react'
import {DateInput } from 'semantic-ui-calendar-react';

export class semanticDate extends Component {
    //  handleChange=(e, { value })=> {
    //     return input.onChange(value);
    //   }
    render() {
        console.log(' BEFORE semanticDate props', this.props);
        console.log(' BEFORE semanticDate props.input', this.props.input);
     
        const {input:{onChange,value:{value}, ...input}}= this.props;
        console.log(' **********after semanticDate input', input);
        console.log(' **********after semanticDate value', value);
        //console.log(' after semanticDate !!value', !!value);
       // console.log('after semanticDate input', input);
        var dateValue='';
        if (!!value ){
            console.log(' **********AAAAAAAAAA semanticDate value', value);
            dateValue = value; //moment(value).format('DD-MM-YYYY');
            console.log(' **********BBBBBBBBBBB semanticDate dateValue', dateValue);
        }
        return (
            <React.Fragment>
                <DateInput
                 {...input}
                 value = {dateValue}
                 //{moment(value).format('MM-YYYY')} 
                    onChange={(e,value)=>onChange(value)}
                   
                   
                />
            </React.Fragment>
        )
    }
}
