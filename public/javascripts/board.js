define(['jquery', 'checker'], function($, Checker) {

    return function() {

        /*
         call size
         */
        this.cellSize = undefined;
        var self = this;

        this.pos = {};
        this.prevData = [];

        this.canvas = undefined;

        this.checkers = [],

        this.init = function(el) {
            this.el = el
            this.canvas = this.el.getContext("2d");

            $(this.el).on('mousedown', this.onMouseDown);
            $(this.el).on('mouseup', this.onMouseUp);
            $(this.el).on('mouseout', this.onMouseUp);
        }


        this.updateCheckersPos = function(data) {
            var pos = data.rival.concat(data.own);
            this.prevData = pos;
            this.checkers = [];
            for (var i = 0; i < pos.length; i++) {
                var checker = new Checker();
                checker.init({
                    'canvas': this.canvas,
                    'el': this.el
                });
                checker.setRadius(this.cellSize/2);
                checker.setPos(this.transform(pos[i][0], pos[i][1]));
                this.checkers.push(checker);
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

            for (var i = 0; i < this.checkers.length; i++) {
                this.checkers[i].setPos(this.transform(this.prevData[i][0], this.prevData[i][1]));
                this.checkers[i].setRadius(this.cellSize/2);

                this.checkers[i].reDraw();
            }

        },

        this.onMouseDown = function(event) {

            var pos = {
                x: event.clientX,
                y: event.clientY
            }

            for (var i = 0; i < self.checkers.length; i++) {
                if (self.distance(self.checkers[i].getPos(), pos) <= self.checkers[i].radius) {
                    self.startPos = pos;
                    self.movedChecker = self.checker.id;
                }
            }

        },

        this.onMouseUp = function(event) {

            if (self.startPos && self.startPos.x && self.startPos.y) {
                var deltaX = self.startPos.x - event.clientX;
                var deltaY = self.startPos.y - event.clientY;
            }


        },

        this.distance = function(pos1, pos2) {
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
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