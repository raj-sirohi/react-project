import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class Message extends Component {
    render() {
        return (
            <React.Fragment>
                <Header as='h2'> This is Message </Header>
            </React.Fragment>
        )
    }
}
export default Message;