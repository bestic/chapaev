define(['paper'], function(paper){

    return function() {

        this.RADIUS_SCALE = 0.8;
        var self = this;

        // Can be pushed
        this.STATUS_ACTIVE = 'active';
        this.STATUS_MOVING = 'moving';
        this.STATUS_OUT = 'out';

        this.canvas = undefined;
        this.el = undefined;

        this.id = undefined;
        this.pos = {
            x: undefined,
            y: undefined
        };
        this.radius = undefined;
        this.player = 1;
        this.status = undefined;

        this.init = function(options) {
            var options = options || {};

            if (options.radius) {
                this.setRadius(options.radius);
            }

            if (options.id) {
                this.id = options.id;
            }

            if (options.status) {
                this.status = options.status;
            }

            if (options.el) {
                this.el = options.el;
            }

            if (options.canvas) {
                this.setCanvas(options.canvas);
            }

            if (options.owner) {
                this.color = '#F00';
            } else {
                this.color = '#000';
            }


        };

        this.setCanvas = function(canvas) {
            this.canvas = canvas;
        }

        this.setStatus = function(status) {
            this.status = status;
        }

        this.setPlayer = function(player) {
            this.player = player;
        }

        this.setRadius = function(radius) {
            this.radius = radius * this.RADIUS_SCALE;
        }

        this.setPos = function(pos) {
            this.pos.x = pos.x;
            this.pos.y = pos.y;
        };

        this.getPos = function() {
            return this.pos;
        };

        this.reDraw = function() {

            this.canvas.fillStyle = this.color;
            this.canvas.beginPath();
            this.canvas.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
            this.canvas.closePath();
            this.canvas.fill();



        };





    }

});