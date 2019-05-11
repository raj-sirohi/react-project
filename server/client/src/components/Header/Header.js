import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react'

class Header1 extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ background: 'white', height: '5em' }}>
                    <Header as='h3'> This is header </Header>
                </div>
            </React.Fragment>
        )
    }
}
export default Header1;