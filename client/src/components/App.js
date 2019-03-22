import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { Radio , Button,Container} from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
//import '../semantic/dist/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Container >
       
        <Navbar/>
       App
       <div>
       <Radio label='Make my profile visible' />
       </div>
       <div>
       <Checkbox label='Make my profile visible' />
       </div>
       <div>
       <Button > Hi there </Button>
       </div>
       <div>
       <Button primary> Hi there </Button>
       </div>
       
      
      </Container>
    );
  }
}

export default App;
