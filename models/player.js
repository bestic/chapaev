var Player = function() {
  // possible values 'waiting', 'game', 'finished'
  this.status = 'waiting';

  this.init = function() {
    console.log('Hello');
  }
};

module.exports = Player;