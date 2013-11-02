define([], function(){

    return function() {

        /*
         call size
         */
        this.cell_size = undefined;

        this.board_pos = {};

        this.canvas = undefined;

        this.init = function(el) {
            this.el = el
            this.canvas = this.el.getContext("2d");
        }

        this.reDraw = function() {

            this.cell_size = this.el.height / 11;
            this.board_pos = {
                x: (this.el.width - this.cell_size*8)/2,
                y: (this.el.height - this.cell_size*8)/2
            }
            // border color
            this.canvas.strokeStyle = '#B70A02';
            this.canvas.strokeRect(this.board_pos.x - 10, this.board_pos.y - 10, 8*this.cell_size + 2*10, 8*this.cell_size + 2*10);
            this.canvas.strokeRect(this.board_pos.x - 5, this.board_pos.y - 5, 8*this.cell_size + 2*5, 8*this.cell_size + 2*5);

            this.canvas.fillStyle = '#AF5200'; // меняем цвет клеток
            this.canvas.fillRect(this.board_pos.x, this.board_pos.y, 8*this.cell_size, 8*this.cell_size);
            for (var i=0; i<8; i+=2) {
                for (var j=0; j<8; j+=2) {
                    this.canvas.clearRect(this.board_pos.x + i*this.cell_size, this.board_pos.y + j*this.cell_size, this.cell_size, this.cell_size);
                    this.canvas.clearRect(this.board_pos.x + (i+1)*this.cell_size, this.board_pos.y + (j+1)*this.cell_size, this.cell_size, this.cell_size);
                }
            }
        }


    }

});