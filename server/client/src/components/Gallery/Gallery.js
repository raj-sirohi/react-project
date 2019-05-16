import React, { Component } from 'react';
import { Header, Button, Card, Container } from 'semantic-ui-react'
import DropZone2 from '../UI/DropZone/DropZone2';

class Gallery extends Component {

    renderGallery = () => {

        return (

            <div >

                <div style={{display:'flex'}}>
                <div style={{  width: '100%' }}>
                    <DropZone2/>
                </div>
                
                </div>
               

                <div>

                   <div style={{ marginTop:'1em',border: '1px solid black', height: '100px', width: '100%' }}>
                    </div>
                   

                </div>
                
            </div>
        )
    }
    render() {
        return (
            <React.Fragment>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Manage My Collection</Card.Header>
                        <Card.Description>
                            {this.renderGallery()}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                        <Button color='blue'>
                            Approve
          </Button>
                        <Button basic color='red'>
                            Decline
          </Button>

                    </Card.Content>
                </Card>
            </React.Fragment>
        )
    }
}
export default Gallery;