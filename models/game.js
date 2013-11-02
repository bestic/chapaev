var models = require('../models');
World = models.World;

var Game = function(players) {
  this.players = players;
  this.world = null;
  this.checkersPlaye1 = [];
  this.checkersPlaye2 = [];

  this.player1Positions = [
      [0.5, 0.5],
      [0.5, 1.5],
      [0.5, 2.5],
      [0.5, 3.5],
      [0.5, 4.5],
      [0.5, 5.5],
      [0.5, 6.5],
      [0.5, 7.5]
  ];

  this.player2Positions = [
      [7.5, 0.5],
      [7.5, 1.5],
      [7.5, 2.5],
      [7.5, 3.5],
      [7.5, 4.5],
      [7.5, 5.5],
      [7.5, 6.5],
      [7.5, 7.5]
  ];

  this.init = function() {
      var self = this;
      this.world = new World();

      // add player #1 checkers
      this.player1Positions.forEach(function(item){
          var checkerId = self.world.addChecker(item[0], item[1]);
          self.checkersPlaye1.push(checkerId);
      });

      // add player #2 checkers
      this.player2Positions.forEach(function(item){
          var checkerId = self.world.addChecker(item[0], item[1]);
          self.checkersPlaye2.push(checkerId);
      });

    this.players.forEach(function(player) {
      player.statusUpdate("Rock'N'Roll");
      player.socket.emit('game_start', 'start');
    });

  };

  this.init();
};

module.exports = Game;
