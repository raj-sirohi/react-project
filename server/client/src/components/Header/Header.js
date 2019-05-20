import React, { Component } from 'react';
import { Header,Grid, Container } from 'semantic-ui-react'
import './Header.css'

class Header1 extends Component {
    render() {
        return (
            <React.Fragment>
                  <div className='header-wrapper'>
                    <Header as='h3'> This is header for computer </Header>
                </div>
            </React.Fragment>
            
                
            
        )
    }
}
export default Header1;