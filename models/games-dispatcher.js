var models = require('../models')
  , Player = models.Player
  , Game = models.Game;

var GamesDispatcher = function(socket) {
  this.games = [];
  this.readyPlayer = null;
  this.waitingPlayers = [];
  var self = this;

  this.addPlayer = function(socket) {
    var player = new Player(socket, function () {
      if (self.readyPlayer) {
        new Game([ player, self.readyPlayer ]);
        self.readyPlayer = null;
      } else {
        self.readyPlayer = player;
      }

      self.waitingPlayers.splice(self.waitingPlayers.indexOf(player), 1);
    });

    self.waitingPlayers.push(player);
  };
};

module.exports = GamesDispatcher;