define(['canvas', 'jquery', 'knob'], function(canvas, $, knob) {

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
    $('.indicator').show();
    canvas.board.setGameStatus(true);
  });

  socket.on('game_end', function(data) {
    console.log('Game ended');
    // TODO enable board for interaction
    if (data.win) {
        $('.result').addClass('win');
        $('.result').removeClass('loose');
    } else {
        $('.result').addClass('loose');
        $('.result').removeClass('win');
    }

    $('.result').html(data.msg);

  });

  socket.on('update', function(data) {
    canvas.board.updateCheckersPos(data);
  });

  $('.indicator').hide();

  var indicator = $('.power-indicator');

  indicator.knob({});
  function powerIndicator() {
    var next = parseInt(indicator.val()) + 1;
    if (next == 100) {
      next = 0;
    }
    indicator.val(next).trigger('change');
    setTimeout(powerIndicator, 5);
  }
  powerIndicator();
});
