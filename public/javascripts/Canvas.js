define(['jquery', 'domready', 'board', 'paper'], function($, domready, Board) {

    var canvas = {

        /*
         Canvas object
         */
        el: undefined,

        /*
         Canvas context
         */
        canvas: undefined,

        board: new Board(),

        init: function(el) {
            this.el = el;

            this.canvas = this.el.getContext("2d");
            this.board.init(this.el)
        },

        reDraw: function() {
            this.el.width = this.el.parentNode.clientWidth;
            this.el.height = this.el.parentNode.clientHeight;
            this.board.reDraw();
            this.test_draw()
        },


        resize: function() {
            this.reDraw();
        },


        test_draw:  function () {

            var time = new Date().getTime() * 0.002;
            var x = Math.sin( time ) * 96 + 128;
            var y = Math.cos( time * 0.9 ) * 96 + 128;

//            this.board.fillStyle = 'rgb(245,245,245)';
//            this.board.fillRect( 0, 0, 255, 255 );

            this.canvas.fillStyle = 'rgb(255,0,0)';
            this.canvas.beginPath();
            this.canvas.arc( this.board.board_pos.x + x, this.board.board_pos.y + y, 10, 0, Math.PI * 2, true );
            this.canvas.closePath();
            this.canvas.fill();

        }

};


    var frame = 0;
    var lastUpdateTime = 0;
    var acDelta = 0;
    var msPerFrame = 100;

    function update() {
        requestAnimFrame(update);
        canvas.reDraw();

//        var delta = Date.now() - lastUpdateTime;
//        if (acDelta > msPerFrame) {
//            acDelta = 0;
//            canvas.reDraw();
//        } else {
//            acDelta += delta;
//        }
//
//        lastUpdateTime = Date.now();
    }

    domready(function() {
        canvas.init(document.getElementById("board"));
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
//        canvas.reDraw();
        requestAnimFrame(update);

        $(window).resize(function(){
            canvas.resize();
        });

    });



});