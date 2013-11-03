var models = require('../models');
World = models.World;
Checker = models.Checker;

var Game = function(players) {
  this.players = players;
  this.world = null;
  this.checkersPlayer1 = [];
  this.checkersPlayer2 = [];
  this.updateTimeout = 200;


  // game data
  this.radius = 0.8;
  this.player1Positions = [
      [0.5, 0.5],
      [1.5, 0.5],
      [2.5, 0.5],
      [3.5, 0.5],
      [4.5, 0.5],
      [5.5, 0.5],
      [6.5, 0.5],
      [7.5, 0.5]
  ];
  this.player2Positions = [
      [0.5, 7.5],
      [1.5, 7.5],
      [2.5, 7.5],
      [3.5, 7.5],
      [4.5, 7.5],
      [5.5, 7.5],
      [6.5, 7.5],
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
          self.checkersPlayer1.push(checker);
      });

      // add player #2 checkers
      this.player2Positions.forEach(function (item) {
          var checkerId = self.world.addChecker(item[0], item[1], self.radius);
          var checker = new Checker(checkerId, item[0], item[1]);
          self.checkersPlayer2.push(checker);
      });

    this.players.forEach(function (player, index) {
      player.statusUpdate("Rock'N'Roll");
      player.socket.emit('game_start', 'start');
      if (index) {
        player.sendUpdate(self.checkersPlayer2, self.checkersPlayer1);
      } else {
        player.sendUpdate(self.checkersPlayer1, self.checkersPlayer2);
      }
      player.game = self;
    });

    setInterval(function() { self.update() }, this.updateTimeout);
  };

  this.init();

  // checks if coordinates are out of the box
  this.checkForBoundaries = function(x, y) {
      if (true) {

      }
  }

  //
  this.updatecheckers = function() {
     var self = this;
     this.world.items.forEach(function(item, index){

         var pos = item.GetPosition();

         // ugly check, improve in the future
         if (typeof self.checkersPlayer1[index] !== 'undefined') {
             self.checkersPlayer1[index].x = pos.x;
             self.checkersPlayer1[index].y = pos.y;
         }

         if (typeof self.checkersPlayer2[index] !== 'undefined') {
             self.checkersPlayer2[index].x = pos.x;
             self.checkersPlayer2[index].y = pos.y;
         }

     });

  };

  // update the game, should be called periodically on server
  this.update = function() {
    console.log('Update checkers positions');

    // update world
    this.world.update();

    // update checkers positions according to physics
    this.updatecheckers();

    // Apply game rules

    // TODO: check for checkers out of game board
    // TODO: check for checkers that just have stopped, and pass it to the next turn

    this.players[0].sendUpdate(this.checkersPlayer1, this.checkersPlayer2);
    this.players[1].sendUpdate(this.checkersPlayer2, this.checkersPlayer1);
  };

  this.end = function() {
    var winId = 0;
    if (this.checkersPlayer2.length > 0) {
      winId = 1;
    }
    var winner = this.players[winId];
    var loser  = this.players[!winId + 0];
    winner.socket.on('game_end', 'You won! Congratulations!!!');
    loser.socket.on('game_end', 'You lose!');
  };
};

module.exports = Game;
