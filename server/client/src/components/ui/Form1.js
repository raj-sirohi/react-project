import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux';

const form1 =(props)=>{


    return (

        <div>
            <form onSubmit={this.props.handleSubmit((values)=>this.props.createUser(values,this.props.history))}>
                {props.children}
            </form>





        </div>
    )
}

