define(['paper'], function(paper){

    return function() {

        this.RADIUS_SCALE = 0.8;

        // Can be pushed
        this.STATUS_ACTIVE = 'active';
        this.STATUS_MOVING = 'moving';
        this.STATUS_OUT = 'out';


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

        };


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
            var p = new paper.Path.Circle(new paper.Point(this.pos.x, this.pos.y), this.radius);
            p.fillColor = 'black';
        };



    }

});