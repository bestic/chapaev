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
        }

        this.setSocket = function(socket) {
            this.socket = socket;
        },

        this.updateCheckersPos = function(data) {
            for (var i = 0; i < data.own.length; i++) {
                data.own[i].owner = true;
            }
            var pos = data.rival.concat(data.own);
            this.prevData = pos;
            this.checkers = [];
            var out_count = 0;
            for (var i = 0; i < pos.length; i++) {
                var checker = new Checker();
                if (!pos[i].status) {
                    out_count++;
                }
                checker.init({
                    'canvas': this.canvas,
                    'el': this.el,
                    'id': pos[i].id,
                    'status': pos[i].status,
                    'owner': pos[i].owner

                });
                checker.setRadius(this.cellSize/2);
                checker.setPos(this.transform(pos[i].x, pos[i].y));
                this.checkers.push(checker);
            }
            console.log('out:' + out_count);
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

            this.refreshScore();

            for (var i = 0; i < this.checkers.length; i++) {
                this.checkers[i].setPos(this.transform(this.prevData[i].x, this.prevData[i].y));
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
                if (self.checkers[i].owner &&
                    self.checkers[i].status &&
                    self.distance(self.checkers[i].getPos(), pos) <= self.checkers[i].radius) {

                    self.startPos = pos;
                    self.movedChecker = self.checkers[i].id;
                    break;
                }
            }

        },

        this.onMouseUp = function(event) {

            if (self.startPos && self.startPos.x && self.startPos.y) {

                var pos = self.backTransform(self.startPos.x - event.clientX, self.startPos.y - event.clientY);
                var data = {
                    'vector': {
                        'x': pos.x,
                        'y': pos.y
                    },
                    'id': self.movedChecker
                };

                console.log(data);

                self.socket.emit('kick', data);

                self.startPos = null;
            }



        },

        this.refreshScore = function() {

            var ownNumber = 0;
            var rivalNumber = 0;

            for (var i = 0; i < self.checkers.length; i++) {
                if (self.checkers[i].status) {
                    if (self.checkers[i].owner) {
                        ownNumber++;
                    } else {
                        rivalNumber++;
                    }
                }
            }

            $('.own').html(ownNumber);
            $('.rival').html(rivalNumber);

            if (ownNumber <= 0) {
                $('.win').val('Наши победили')
            }

            if (rivalNumber <= 0) {
                $('.win').val('Наши проиграли')
            }

            if (ownNumber <= 0 && rivalNumber <= 0) {
                $('.win').val('Ничья!')
            }

        }

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

        },

        this.backTransform = function(x, y) {

            var resX = x / this.cellSize;
            var resY = y / this.cellSize;

            return {
                x: resX,
                y: resY
            }

        }


    }

});