var io = require('socket.io')
  , models = require('../models')
  , GamesDispatcher = models.GamesDispatcher;
var http = require('http');
var cookie = require("cookie");
var connect = require("connect");


exports.initialize = function(server) {
  io = io.listen(server);

  io.set('log level', 1);
  io.set('authorization', function (handshakeData, accept) {

    if (handshakeData.headers.cookie) {
      handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
      handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
      if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
        return accept('Cookie is invalid.', false);
      }
    } else {
      return accept('No cookie transmitted.', false);
    } 
    accept(null, true);
  });

  var gamesDispatcher = new GamesDispatcher();

  io.sockets.on("connection", function(socket) {
    gamesDispatcher.addPlayer(socket);
  });
};