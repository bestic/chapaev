define(['canvas', 'jquery'], function(canvas, $) {

  var socket   = io.connect()
    , statusEl = $('#game_status');

  $('#set-name').on('click', function(el) {
    socket.emit('set_name', $('#player_name').val());
  });


  socket.on('status_update', function(msg) {
    statusEl.html(msg);
  });

  socket.on('game_start', function(data) {
    console.log('Game started');
    // TODO enable board for interaction
  });


  socket.on('message', function (data) {
    data = JSON.parse(data);
    console.log('I got message from server');
    console.log(data);

    socket.emit('kick', {data: 'Test data', type: 'userMessage'});
  });


});
