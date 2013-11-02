var models = require('../models');
World = models.World;

var Game = function(players) {
  this.players = players;
  this.world = null;
  var game = this;

  this.init = function() {
    this.world = new World();
    console.log('New game started');

    this.players.forEach(function(player) {
      player.statusUpdate("Rock'N'Roll");
    });
  };

  this.init();
};

module.exports = Game;
