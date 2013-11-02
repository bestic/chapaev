define(['checker'], function(Checker) {

    return function() {

        /*
         call size
         */
        this.cellSize = undefined;

        this.pos = {};

        this.canvas = undefined;

        this.checkers = [],

        this.init = function(el) {
            this.el = el
            this.canvas = this.el.getContext("2d");
        }


        this.updateCheckersPos = function(pos) {

            this.checkers = [];
            for (var i = 0; pos.length; i++) {
                var checker = new Checker();
                checker.setRadius(this.cellSize/2);
                checker.setPos(this.transform(pos[i].x, pos[i].y));
            }
        },

        this.reDraw = function() {

            this.cellSize = this.el.height / 11;
            this.pos = {
                x: (this.el.width - this.cellSize*8)/2,
                y: (this.el.height - this.cellSize*8)/2
            }
            // border color
            this.canvas.strokeStyle = '#B70A02';
            this.canvas.strokeRect(this.pos.x - 10, this.pos.y - 10, 8*this.cellSize + 2*10, 8*this.cellSize + 2*10);
            this.canvas.strokeRect(this.pos.x - 5, this.pos.y - 5, 8*this.cellSize + 2*5, 8*this.cellSize + 2*5);

            this.canvas.fillStyle = '#AF5200'; // меняем цвет клеток
            this.canvas.fillRect(this.pos.x, this.pos.y, 8*this.cellSize, 8*this.cellSize);
            for (var i=0; i<8; i+=2) {
                for (var j=0; j<8; j+=2) {
                    this.canvas.clearRect(this.pos.x + i*this.cellSize, this.pos.y + j*this.cellSize, this.cellSize, this.cellSize);
                    this.canvas.clearRect(this.pos.x + (i+1)*this.cellSize, this.pos.y + (j+1)*this.cellSize, this.cellSize, this.cellSize);
                }
            }

            // Delete later
            this.checkers.push(new Checker());
            this.checkers[0].setRadius(this.cellSize/2);
            this.checkers[0].setPos(this.transform(4.5, 4.5));

            for (var i = 0; i < this.checkers.length; i++) {
                this.checkers[i].reDraw();
            }

        },

        this.transform = function(x, y) {
            
            var resX = x * this.cellSize + this.pos.x;
            var resY = y * this.cellSize + this.pos.y;

            return {
                x: resX,
                y: resY
            }


            
        }


    }

});