var io = require('socket.io');

exports.initialize = function(server) {
  io = io.listen(server);

  io.sockets.on("connection", function(socket){
    socket.send(JSON.stringify({
      type:'serverMessage',
      message: 'Welcome to the most interesting chat room on earth!'}
    ));

    socket.on('message', function(message){
      console.log(message);
      message= JSON.parse(message);

      console.log(message.type);
      if (message.type == "userMessage") {
        console.log('This is user message');
        socket.broadcast.send(JSON.stringify(message));
        message.type = "myMessage";
        socket.send(JSON.stringify(message));
      }
    });
  });
};