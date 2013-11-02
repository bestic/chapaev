define(['jquery', 'domready'], function($, domready) {

    var canvas = {

        /*
         Canvas object
         */
        el: undefined,

        /*
         Canvas context
         */
        board: undefined,

        /*
        call size
         */
        cell_size: undefined,

        board_pos: {

        },

        init: function(el) {
            this.el = el;

            this.board = this.el.getContext("2d");
            this.calculateDimentions();
        },

        reDraw: function() {

            // border color
            this.board.strokeStyle = '#B70A02';
            this.board.strokeRect(this.board_pos.x - 10, this.board_pos.y - 10, 8*this.cell_size + 2*10, 8*this.cell_size + 2*10);
            this.board.strokeRect(this.board_pos.x - 5, this.board_pos.y - 5, 8*this.cell_size + 2*5, 8*this.cell_size + 2*5);

            this.board.fillStyle = '#AF5200'; // меняем цвет клеток
            this.board.fillRect(this.board_pos.x, this.board_pos.y, 8*this.cell_size, 8*this.cell_size);
            for (var i=0; i<8; i+=2) {
                for (var j=0; j<8; j+=2) {
                    this.board.clearRect(this.board_pos.x + i*this.cell_size, this.board_pos.y + j*this.cell_size, this.cell_size, this.cell_size);
                    this.board.clearRect(this.board_pos.x + (i+1)*this.cell_size, this.board_pos.y + (j+1)*this.cell_size, this.cell_size, this.cell_size);
                }
            }
        },

        calculateDimentions: function() {
            this.el.width = this.el.parentNode.clientWidth;
            this.el.height = this.el.parentNode.clientHeight;

            // 11 equal parts, 8 from which will be board
            this.cell_size = this.el.height / 11;
            this.board_pos = {
                x: (this.el.width - this.cell_size*8)/2,
                y: (this.el.height - this.cell_size*8)/2
            }
        },

        resize: function() {
            this.calculateDimentions();
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

        $(window).resize(function(){
            canvas.resize();
        });

    });



});