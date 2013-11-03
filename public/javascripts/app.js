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
    canvas.board.setSocket(socket);
  });

  socket.on('update', function(data) {

    canvas.board.updateCheckersPos(data);
    console.log('Updated position');
    console.log(data);
    // TODO update checkers on board
  });

  socket.on('message', function (data) {
    data = JSON.parse(data);
    console.log('I got message from server');
    console.log(data);

    socket.emit('kick', {data: 'Test data', type: 'userMessage'});
  });


});
