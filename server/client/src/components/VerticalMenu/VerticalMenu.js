import React, { Component } from 'react'
import { Input, Label, Menu ,Card} from 'semantic-ui-react'

class VerticalMenu extends Component{
    state = { activeItem: 'inbox' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
        return (
            <Card 
          //  style={{width:'15%', marginLeft:'1em',marginRight:'1em', height:'100vh'}}
            //style={{marginLeft:'1em',marginRight:'1em', height:'100vh'}}
            //style={ {height:'50em'}}
            style={ {height:'calc(100vh - 5em)',width:'100%'}}
            >
            <Card.Content style={ {width:'100%'}}>
            <Menu style={{width:'100%'}} color='blue'  vertical >
              <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
                <Label color='teal'>1</Label>
                Inbox
              </Menu.Item>
      
              <Menu.Item name='spam'  active={activeItem === 'spam'} onClick={this.handleItemClick}>
                <Label>51</Label>
                Spam
              </Menu.Item>
      
              <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
                <Label>1</Label>
                Updates
              </Menu.Item>
              <Menu.Item>
                <Input icon='search' placeholder='Search mail...' />
              </Menu.Item>
            </Menu>
            </Card.Content>
            </Card>
          )
    }
}

export default VerticalMenu;