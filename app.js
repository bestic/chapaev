var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();
var server = app.listen(process.env.PORT || 3000)
var models = require('./models');
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({store: sessionStore, secret: 'secret', key: 'express.sid'}));

  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes/sockets.js').initialize(server);

app.get('/', routes.index);

console.log("Express server listening on port 3000");
