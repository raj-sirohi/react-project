import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { Menu,Sticky, Segment, Container, Form, Input, Icon, Button, Label } from 'semantic-ui-react'
import './Navbar.css'

class Navbar extends Component {
  state = { activeItem: 'home', name: '', email: '', submittedName: '', submittedEmail: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const { name, email } = this.state
    this.setState({ submittedName: name, submittedEmail: email })
  }
  render() {
    const { activeItem } = this.state
    const { name, email, submittedName, submittedEmail } = this.state
    return (
    <Sticky>
     
      <Segment color='blue' inverted className='segment'>
      
        <Menu inverted pointing secondary className='menu' style={{ margin: 0 }} >
          {/* <Container className='menu__container'> */}
            <Menu.Item header style={{width:'15%', marginRight:'1em',marginLeft:'1em'}}>
              LOGO
          </Menu.Item>
          <Menu.Menu style={{width:'60%'}}>
            <Menu.Item as={NavLink} exact to="/" content="Messages" />
            <Menu.Item as={NavLink} to="/gallery" content="Gallery" />
            <Menu.Item as={NavLink} to="/wall" content="Wall" />
            <Menu.Item as={NavLink} to="/friend" content="Friends" />
            <Menu.Item as={NavLink} to="/signup" content="Sign Up" />
            <Menu.Menu position='right'>
              <Menu.Item className='menu-item__right'>
                <Input size='small' placeholder='email...' />
              </Menu.Item>
              <Menu.Item className='menu-item__right--middle'>
                <Input size='small' placeholder='password...' />
              </Menu.Item>
              <Menu.Item className='menu-item__right'>
                <Button className='menu-item__button' color='teal'>Sign In</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Menu>
          {/* </Container> */}
        </Menu>
      </Segment>
     </Sticky>
    );
  }
}
export default Navbar;
