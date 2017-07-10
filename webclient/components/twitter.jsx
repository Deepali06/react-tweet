import React from 'react';
import io from 'socket.io-client';
import {Card, Image} from 'semantic-ui-react';
import giphy from '../../images/giphy.gif';
import Tweet from 'react-tweet';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class Twitter extends React.Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    }
    this.newFeedAlert = this.newFeedAlert.bind(this);
    this.handleNewTweets = this.handleNewTweets.bind(this);
  }//end of constructor
	//used ReactToastr to notify new feed
  newFeedAlert() {
    this.refs.container.success('New tweet', '', {
      timeOut: 1000,
      extendedTimeOut: 10000
    });
  }//end of newFeedAlert
	//will be invoked in componentDidMount
  handleNewTweets(newTweet) {
    this.setState((prevState, prop) => {
      prevState.tweets.unshift(newTweet);
      return {tweets: prevState.tweets}
    });
    this.newFeedAlert()
  }//end of handleNewTweets
	//adding listener for unread feed in componentWillMount using socketio
  componentWillMount() {
    this.socket = io();
  }//end of componentWillMount
	//adding listener for new feed in componentDidMount using socketio
  componentDidMount() {
    this.socket.on('tweets', function(newTweet) {
      this.handleNewTweets(newTweet)
    }.bind(this));
  }//end of componentDidMount

  render() {
    var tweetPortlets;
    console.log(this.state.tweets);
		//used map functions to group the tweet cards
    if (this.state.tweets.length > 0)
      tweetPortlets = this.state.tweets.map((tweet,index) => {
        return <div style={(index==0)?{border:"2px cyan solid"}:{}}><Tweet data={tweet} id={index}/></div>
      })
    else
      tweetPortlets = <div style={{backgroundImage: "url(" + giphy + ")",height: '80vh',backgroundSize:"cover"}}>
      <p>Your tweets are on the way</p></div>
    return (
      <div>
        <div style={(this.state.tweets.length > 0)?{
          width: '960px',
          marginLeft: "15%"
        }:{}}>
        <br/>
          {tweetPortlets}
        </div>
        <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-right'/>
      </div>
    );
  }//end of render
} //end of class
