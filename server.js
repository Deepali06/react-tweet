var path = require('path');
webpack = require('webpack'),
express = require('express'),
bodyParser = require('body-parser'),
webpackDevMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware'),
webpackConfig = require('./webpack.config'),
config = require('./config/config')
app = express(),
compiler = webpack(webpackConfig),
Twitter = require('twitter'),
book = require('./webserver/routes/book');

//configuring express server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));
app.use('/', book);

//configuring webpackDevMiddleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

//using webpackHotMiddleware for autobuilding of webpack
app.use(webpackHotMiddleware(compiler));

//Listening to port 8080
var http = app.listen(config.port, config.host, function(err, result) {
  if (err) {
    console.error("Error ", err);
  }
  console.log("Server started at " + config.port);
});

//setting up io connection
var  io = require('socket.io')(http);  // by passing the http (the HTTP server) object
io.on('connection',function(socket){  //  listening on the "connection" event
  console.log("connected");})

//setting up twitter stream
var client = new Twitter(config.twitter)
client.stream('statuses/filter', {
  track: 'javascript',
  lang: 'en'
}, function(stream){
  stream.on('data', function(tweet) {
      console.log(tweet.created_at, tweet.text);
      io.emit('tweets', tweet);
    }
  );
  stream.on('error', function(error) {
    console.log(error,"error from twitter api");
  });
});
