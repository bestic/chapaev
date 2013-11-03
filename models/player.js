var Player = function(socket, callback) {
  // possible values 'waiting', 'game', 'finished'
  this.socket = socket;
  this.status = 'not_ready';
  this.name   = '';
  this.game   = null;
  this.movements = [];
  this.callback = callback;
  var player = this;

  this.init = function() {
    this.socket.on('set_name', function(name) {
      if (!player.name) {
        player.name   = name;
        player.status = 'ready';
        console.log('Player set name as ' + name);
        player.statusUpdate("You're ready for fight. Wait a moment!");

        player.callback();
      }
    });

    this.socket.on('kick', function(data) {
      player.game.world.kickChecker(data.id, data.vector);
    });
  };

  this.statusUpdate = function(msg) {
    this.socket.emit('status_update', msg);
  };

  this.move = function(movement) {
    this.movements.push(movement);
  };

  this.sendUpdate = function(checkers, rivalCheckers) {
    this.socket.emit('update', { own: checkers, rival: rivalCheckers });
  };

  this.init();
};

module.exports = Player;