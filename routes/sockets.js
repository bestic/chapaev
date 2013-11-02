var io = require('socket.io');
var models = require('../models');
var Player = models.Player;

exports.initialize = function(server) {
  io = io.listen(server);

  io.sockets.on("connection", function(socket){
    socket.send(JSON.stringify({
      type:'serverMessage',
      message: 'Welcome to the most interesting chat room on earth!'}
    ));

    socket.on('initGame', function(message) {
      console.log(io.sockets.clients().length);
      //message= JSON.parse(message);
    });

    socket.on('kick', function(message) {
      console.log('Player made kick');
    });
  });
};