var models = require('../models');
World = models.World;
Checker = models.Checker;

var Game = function(players) {
  this.players = players;
  this.world = null;
  this.checkersPlayer1 = [];
  this.checkersPlayer2 = [];


  // game data
  this.radius = 0.8;
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
  this.boundaryBox = [
      [0, 0],
      [8, 8]
  ];

  this.init = function() {
      var self = this;
      this.world = new World();

      // add player #1 checkers
      this.player1Positions.forEach(function (item) {
          var checkerId = self.world.addChecker(item[0], item[1], self.radius);
          var checker = new Checker(checkerId, item[0], item[1]);
          self.checkersPlayer1[checkerId] = checker;
      });

      // add player #2 checkers
      this.player2Positions.forEach(function (item) {
          var checkerId = self.world.addChecker(item[0], item[1], self.radius);
          var checker = new Checker(checkerId, item[0], item[1]);
          self.checkersPlayer2[checkerId] = checker;
      });

    this.players.forEach(function (player, index) {
      player.statusUpdate("Rock'N'Roll");
      player.socket.emit('game_start', 'start');
      if (index) {
        player.sendUpdate(self.player2Positions, self.player1Positions);
      } else {
        player.sendUpdate(self.player1Positions, self.player2Positions);
      }
    });

  };

  this.init();

  // checks if coordinates are out of the box
  this.checkForBoundaries = function(x, y) {
      if (true) {

      }
  }

  //
  this.updatecheckers = function() {

     this.world.items.forEach(function(item, index){

         var pos = item.getPosition();

         // ugly check, improve in the future
         if (this.checkersPlayer1[index]) {
             this.checkersPlayer1[index].x = pos.x;
             this.checkersPlayer1[index].y = pos.y;
         }

         if (this.checkersPlayer2[index]) {
             this.checkersPlayer2[index].x = pos.x;
             this.checkersPlayer2[index].y = pos.y;
         }

     });

  };

  // update the game, should be called periodically on server
  this.update = function() {
      // update world
      this.world.update();

      // update checkers positions according to physics
      this.updatecheckers();

      // Apply game rules

      // TODO: check for checkers out of game board
      // TODO: check for checkers that just have stopped, and pass it to the next turn

      // TODO: share updated info with clients
  };


};

module.exports = Game;
