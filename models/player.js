var Player = function(socket) {
  // possible values 'waiting', 'game', 'finished'
  this.socket = socket;
  this.status = 'waiting';
  this.movements = [];

  this.init = function() {
  }

  this.move = function(movement) {
    this.movements.puth(movement);
  }
};

module.exports = Player;