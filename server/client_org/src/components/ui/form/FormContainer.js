import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import PropTypes from 'prop-types';
import "./Form.css";

const formContainer=(props)=>{


    return (

        <div className="formLayout">
            {props.children}
        </div>
    );
}

export default formContainer;