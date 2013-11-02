var events = require('events');
models = require('../models');
Player = models.Player;
Game = models.Game;

var GamesDispatcher = function(socket) {
  this.games = [];
  this.readyPlayer = null;
  this.waitingPlayers = [];
  var self = this;

  this.addPlayer = function(socket) {
    var player = new Player(socket);

    player.on('ready', function(emitter) {
      if (player != emitter) {
        return;
      }

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

GamesDispatcher.prototype = new events.EventEmitter;

module.exports = GamesDispatcher;