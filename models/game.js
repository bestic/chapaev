var models = require('../models');
World = models.World;
Checker = models.Checker;

var Game = function(players) {
  this.players = players;
  this.world = null;
  this.checkersPlayer1 = [];
  this.checkersPlayer2 = [];
  this.updateTimeout = 50;
  this.updateInterval = false;


  // game data
  this.radius = 0.4;
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
      this.world = new World(this.updateTimeout);

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

    this.updateInterval = setInterval(function() { self.update() }, this.updateTimeout);
  };

  this.init();

  // checks if coordinates are out of the box
  this.checkForBoundaries = function(x, y) {
      if (x < -0.4 || x > 8.4 || y < -0.4 || y > 8.4) {
         return false;
      }
      return true;
  }

  //
  this.updatecheckers = function() {
    var self = this;

    this.world.items.forEach(function(item, index) {

      var pos = item.GetPosition();
      var id  = item.GetUserData().id;
      var status = self.checkForBoundaries(pos.x, pos.y);

      var ind = index % 8;

      if (index > 7) {
        self.checkersPlayer1[ind].x = pos.x;
        self.checkersPlayer1[ind].y = pos.y;
        self.checkersPlayer1[ind].id = id;
        self.checkersPlayer1[ind].status = status;
      } else {
        self.checkersPlayer2[ind].x = pos.x;
        self.checkersPlayer2[ind].y = pos.y;
        self.checkersPlayer2[ind].id = id;
        self.checkersPlayer2[ind].status = status;
      }

    });

  };

  // update the game, should be called periodically on server
  this.update = function() {
    this.world.update();
    // update checkers positions according to physics
    this.updatecheckers();

    // Apply game rules
    var player1Lost = true;
    var player2Lost = true;
    this.checkersPlayer1.forEach(function(el, index) {
      if (el.status) {
        player1Lost = false;
      }
    });
    this.checkersPlayer2.forEach(function(el, index) {
      if (el.status) {
        player2Lost = false;
      }
    });
    this.players[0].sendUpdate(this.checkersPlayer1, this.checkersPlayer2);
    this.players[1].sendUpdate(this.checkersPlayer2, this.checkersPlayer1);
    if (player1Lost || player2Lost) {
      this.end(player1Lost, player2Lost)
    }
  };

  this.end = function(pl1Lost, pl2Lost) {
    var winId = 0;
    if (pl1Lost) {
      winId = 1;
    }
    var winner = this.players[winId];
    var loser  = this.players[!winId + 0];
    clearInterval(this.updateInterval);
    winner.socket.emit('game_end', { win: true, msg: 'You won! Congratulations!!!' });
    loser.socket.emit('game_end', { win: false, msg: 'You lose!' });
  };
};

module.exports = Game;
