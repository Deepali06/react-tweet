import React, {Component} from 'react'
import {Input, Menu, Segment, Button} from 'semantic-ui-react'
var {Link} = require('react-router');

export default class NavBar extends React.Component {
   state = {
       activeItem: 'twitter'
   }
   handleItemClick = (e, {name}) => this.setState({activeItem: name})
   render() {
       const {activeItem} = this.state

       return (
           <div>
               <Menu pointing>
                   <Link to='/'>
                       <Menu.Item name='twitter' active={activeItem === 'twitter'} onClick={this.handleItemClick}/>
                   </Link>
                   <Link to='/book'>
                       <Menu.Item name='book' active={activeItem === 'book'} onClick={this.handleItemClick}/>
                   </Link>
                   <Menu.Menu position='right'>
                   </Menu.Menu>
               </Menu>
           </div>
       )
   }
}
