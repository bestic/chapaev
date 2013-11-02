define(['Canvas', 'jquery'], function(canvas, $) {

  var socket = io.connect();

  $('#set-name').on('click', function(el) {
    socket.emit('set_name', $('#player_name').val());
  });


  socket.on('connection', function(data) {
    console.log('Start connection');
  });


  socket.on('message', function (data) {
    data = JSON.parse(data);
    console.log('I got message from server');
    console.log(data);

    socket.emit('kick', {data: 'Test data', type: 'userMessage'});
  });


});
