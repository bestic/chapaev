var Player = function(socket) {
  // possible values 'waiting', 'game', 'finished'
  this.socket = socket;
  this.status = 'not_ready';
  this.name   = '';
  this.movements = [];
  var player = this;

  this.init = function() {
    this.socket.on('set_name', function(name) {
      if (!player.name) {
        player.name   = name;
        player.status = 'ready';
        console.log('Player set name as ' + name);
      }
    });

    this.socket.on('kick', function(data) {
      console.log('Player X made kick');
    });
  }

  this.move = function(movement) {
    this.movements.puth(movement);
  }

  this.init();
};

module.exports = Player;