define(['canvas', 'jquery'], function(canvas, $) {

  var socket   = io.connect()
    , statusEl = $('#game_status');

  canvas.board.setSocket(socket);

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

  socket.on('game_end', function(data) {
    console.log('Game ended');
    // TODO enable board for interaction
  });

  socket.on('update', function(data) {
    canvas.board.updateCheckersPos(data);
    // console.log('Updated position');
    // console.log(data);
    // TODO update checkers on board
  });
});
