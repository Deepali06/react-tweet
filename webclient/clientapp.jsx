import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {NavBar, Twitter, Book} from './components';

var MainComp = React.createClass({
render:function(){
    return(
      <div>
      <NavBar/>
        {this.props.children}
      </div>
    );
  }
})

ReactDOM.render(
		<Router history={hashHistory}>
				<Route  path="/" component={MainComp}>
						 <IndexRoute component={Twitter}/>
						 <Route path="/book" component={Book}/>
		 		</Route>
		</Router>,
  	document.getElementById('mountapp')
);
