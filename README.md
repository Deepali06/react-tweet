Live-tweet-streaming 

Updates live streaming desired tweets (ex: containing "JavaScript")  from twitter.
Used Socket.io for live streaming (as a listener in client side). 
Used Mongo DB for storing unread tweets.

Stores all the unread tweets when user is not connected to server.
Retrieves and notifies the unread tweets from server when user connects to the sever and notifies and streams on new tweet tweeted in twitter
### How to start running
Run these commands

To install the required dependencies 

	$ npm install
	
To run the app
 	
	$ npm run serv

