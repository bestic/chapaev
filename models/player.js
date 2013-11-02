var Player = function(socket) {
  // possible values 'waiting', 'game', 'finished'
  this.socket = socket;
  this.status = 'waiting';
  this.movements = [];

  this.init = function() {
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