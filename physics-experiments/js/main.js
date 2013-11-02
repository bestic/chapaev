// adjust screen size to monitor resolution and 16:9 aspect ratio
var elem = document.getElementById('physics-debug');
var width = elem.parentNode.clientWidth - 15;
elem.width = width;
elem.height = width / 1.77; // 16:9 aspect ratio


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */callback, /* DOMElement Element */element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;
})();



/**
 * Exporting Box2D core objects into external scope
 */
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2AABB = Box2D.Collision.b2AABB,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
    b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
    b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
    b2RevoluteJointDef= Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
    b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;



var b2world = new b2World(
    new b2Vec2(0, 0),   //gravity
    true                 //allow sleep
);

//setup debug draw
contextDebug = elem.getContext("2d");
var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(contextDebug);
debugDraw.SetDrawScale(15.0);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
b2world.SetDebugDraw(debugDraw);


function World() {

    this.buildcircle = function(x, y, r) {

        // build fixture
        var circleFixDef = new b2FixtureDef;
        circleFixDef.density = 1;
        circleFixDef.friction = 10;
        circleFixDef.restitution = 0.7;
        // circleFixDef.filter.groupIndex = -1;

        // define car body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x, y);

        //create circle
        circleFixDef.shape = new b2CircleShape(1.5);

        circle1 = b2world.CreateBody(bodyDef);
        circle1.CreateFixture(circleFixDef);

        return circle1;
    }



    this.update = function() {

        b2world.Step(
            1 / 60      //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
        );
        b2world.ClearForces();

    }

    this.render = function() {

        b2world.DrawDebugData(0, 0);

    }

    var c = [];
    for (var i = 1; i < 10; i++) {
        console.log(i);
        c[i] = this.buildcircle(5 * i, 10);
    }

    c[1].ApplyImpulse(new b2Vec2(10, 0), new b2Vec2(0, 1));
}


var world = new World();


(function update() {
    // update the world first
    world.update();
    // then render the data
    world.render();
    // loop
    requestAnimationFrame(update);
})();

