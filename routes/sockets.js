var io = require('socket.io')
  , models = require('../models')
  , Player = models.Player
  , Game = models.Game
  , waitingPlayer = null;

exports.initialize = function(server) {
  io = io.listen(server);

  io.sockets.on("connection", function(socket) {
    var player = new Player(socket);

    if (waitingPlayer) {
      new Game([player, waitingPlayer]);
      waitingPlayer = null;
    } else {
      waitingPlayer = player;
    }

    socket.send(JSON.stringify({
      type:'serverMessage',
      message: 'Welcome to the most interesting chat room on earth!'}
    ));

    socket.on('initGame', function(message) {
    });
  });
};