// connect to the socket server
var socket = io.connect();

socket.on('message', function (data) {
  data = JSON.parse(data);
  console.log('I got message from server');
  console.log(data);

  socket.emit('kick', {data: 'Test data', type: 'userMessage'});
});

//socket.send(JSON.stringify({data: 'Test data', type: 'userMessage'}));
