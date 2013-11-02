var io = require('socket.io')
  , models = require('../models')
  , GamesDispatcher = models.GamesDispatcher;


exports.initialize = function(server) {
  io = io.listen(server);

  var gamesDispatcher = new GamesDispatcher();

  io.sockets.on("connection", function(socket) {
    gamesDispatcher.addPlayer(socket);
  });
};