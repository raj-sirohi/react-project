import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react'

class Header1 extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Header as='h3'> This is header </Header>
                </Container>
            </React.Fragment>
        )
    }
}
export default Header1;