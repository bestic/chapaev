define(['domready'], function(domready) {

    var canvas = {

        /*
         Canvas object
         */
        el: undefined,

        /*
         Canvas context
         */
        board: undefined,

        init: function(el) {
            this.el = el;
            this.board = this.el.getContext("2d");

        },

        CELL_WIDTH: 32,



        reDraw: function() {



            this.el.width  = 640;
            this.el.height = 480;
            this.board.strokeStyle = '#B70A02'; // меняем цвет рамки
            this.board.strokeRect(this.CELL_WIDTH, this.CELL_WIDTH, 9*this.CELL_WIDTH, 9*this.CELL_WIDTH);
//            this.board.strokeRect(18, 18, 8*this.CELL_WIDTH + this.CELL_WIDTH/3, 8*this.CELL_WIDTH + this.CELL_WIDTH/3);
            this.board.fillStyle = '#AF5200'; // меняем цвет клеток
            this.board.fillRect(this.CELL_WIDTH, this.CELL_WIDTH, 9*this.CELL_WIDTH, 9*this.CELL_WIDTH);
            for (var i=0; i<8; i+=2) {
                for (var j=0; j<8; j+=2) {
                    this.board.clearRect(this.CELL_WIDTH + i*this.CELL_WIDTH, this.CELL_WIDTH + j*this.CELL_WIDTH, this.CELL_WIDTH, this.CELL_WIDTH);
                    this.board.clearRect(this.CELL_WIDTH + (i+1)*this.CELL_WIDTH, this.CELL_WIDTH + (j+1)*this.CELL_WIDTH, this.CELL_WIDTH, this.CELL_WIDTH);
                }
            }
        },

        resize: function() {
            this.el.width = this.el.parentNode.clientWidth;
            this.el.height = this.el.parentNode.clientHeight;
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
        if (acDelta > msPerFrame)
        {
            acDelta = 0;
            canvas.reDraw();
            frame++;
            if (frame >= 6) frame = 0;
        } else
        {
            acDelta += delta;
        }

        lastUpdateTime = Date.now();
    }




    domready(function() {
        canvas.init(document.getElementById("board"));
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
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

    });



});