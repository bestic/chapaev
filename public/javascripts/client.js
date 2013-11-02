// connect to the socket server
var socket = io.connect();

socket.on('message', function (data) {
  data = JSON.parse(data);
  console.log(data);
});

socket.send(JSON.stringify({'data': 'Test data'}));
