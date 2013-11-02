var Game = function(players) {
  this.players = players;

  this.init = function() {
    console.log('Start game');
  };

  this.init();
};

module.exports = Game;
