var models = require('../models');
World = models.World;

var Game = function(players) {
  this.players = players;
  this.world = null;

  this.init = function() {
      this.world = new World();
      console.log('New game started');
      console.log(this.world);
  };

  this.init();
};

module.exports = Game;
