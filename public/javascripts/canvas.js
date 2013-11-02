define(['jquery', 'domready', 'board', 'paper'], function($, domready, Board, paper) {

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

        checkers: [],

        init: function(el) {
            this.el = el;

            this.canvas = this.el.getContext("2d");
            this.board.init(this.el)
        },

        reDraw: function() {
            this.el.width = this.el.parentNode.clientWidth;
            this.el.height = this.el.parentNode.clientHeight;
            this.board.reDraw();
            //this.test_draw();
            //this.test_paper();
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
            this.canvas.arc( this.board.pos.x + x, this.board.pos.y + y, 10, 0, Math.PI * 2, true );
            this.canvas.closePath();
            this.canvas.fill();

        },

        test_paper: function() {

            var path = new paper.Path();
            // Give the stroke a color
            path.strokeColor = 'black';
            var start = new paper.Point(100, 100);
            // Move to start and draw a line from there
            path.moveTo(start);
            // Note that the plus operator on Point objects does not work
            // in JavaScript. Instead, we need to call the add() function:
            path.lineTo(start.add([ 200, -50 ]));
            // Draw the view now:
            paper.view.draw();

        }

    };


    var frame = 0;
    var lastUpdateTime = 0;
    var acDelta = 0;
    var msPerFrame = 100;

    function update() {
//        requestAnimFrame(update);
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
        paper.setup(document.getElementById("board"));

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