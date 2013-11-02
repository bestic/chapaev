define(['jquery', 'domready', 'Board'], function($, domready, Board) {

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
        },


        resize: function() {
            this.reDraw();
        }
    };


    var frame = 0;
    var lastUpdateTime = 0;
    var acDelta = 0;
    var msPerFrame = 100;

    function update() {
        requestAnimFrame(update);

        var delta = Date.now() - lastUpdateTime;
        if (acDelta > msPerFrame) {
            acDelta = 0;
            canvas.reDraw();
        } else {
            acDelta += delta;
        }

        lastUpdateTime = Date.now();
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