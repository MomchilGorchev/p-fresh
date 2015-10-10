/**
 * Created by momchillgorchev on 27/07/15.
 */
var TweenMax = TweenMax || {};
var canvas = document.querySelector('#footer__canvas'),
    ctx    = canvas.getContext('2d'),

    footerContainer = document.querySelector('footer'),

    WIDTH  = canvas.width = window.innerWidth,
    HEIGHT = canvas.height = 100,

    shapes = [],
    colors = ['255, 255, 255'];

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

ctx.globalAlpha = 0.15;

console.log(footerContainer);


// Constructor function
function CanvasScene(sides, animationSpeed, polygons, noAlpha){
    // Cache the initiator object and check params
    'use strict';
    var constructor = this;
    constructor.sides = sides || 6;
    constructor.animationSpeed = animationSpeed || 2;
    constructor.polygons = polygons || 10;
    constructor.noAlpha = noAlpha;

    // Init
    constructor.init = function(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        shapes = [];
        constructor.createShapes(constructor.sides);
        constructor.reDraw();
        for(var k = 0; k < shapes.length; k++){
            constructor.animateShape(shapes[k], ((k+1) * 0.2));
        }
    };

    // Main shape creator method
    constructor.Polygon = function(ctx, x, y, radius, sides, startAngle, anticlockwise, color, alpha){
        var _this = this;
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        _this.sides = sides;
        _this.startAngle = startAngle;
        _this.anticlockwise = anticlockwise;
        _this.color = color;
        _this.alpha = !alpha ? 1 : 0.3 - _this.radius * 0.0002; //Bigger radius means lower opacity

        // Draw the polygon
        _this.draw = function(ctx){
            ctx.beginPath();
            ctx.strokeStyle = 'rgba('+ _this.color +', '+ _this.alpha + ')';
            ctx.lineWidth = 37;
            if (_this.sides < 3) { return; }
            var a = (Math.PI * 2) / _this.sides;
            a = _this.anticlockwise ? -a : a;
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate(_this.startAngle);
            ctx.moveTo(_this.radius,0);
            for (var i = 1; i < _this.sides; i++) {
                ctx.lineTo(_this.radius*Math.cos(a*i),_this.radius*Math.sin(a*i));
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
        return this;
    };

    // Create "n" number of polygons
    constructor.createShapes = function(sides){
        for (var i = 0; i < constructor.polygons; i++){
            var poly = new constructor.Polygon(
                ctx,                                    // Canvas context
                10 ,                             // x value
                HEIGHT - 10,                             // y value
                (i+1) * 65,                             // radius
                sides,                                  // sides
                10,                                     // start angle
                -Math.PI /2,                            // anticlockwise
                colors[Math.floor(i%colors.length)],    // random color
                constructor.noAlpha                     // alpha
            );
            // Save all shapes for later use
            shapes.push(poly);
        }
    };

    // The loop method
    constructor.reDraw = function(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for(var k = 0; k < shapes.length; k++){
            shapes[k].draw(ctx);
        }
        requestAnimationFrame(constructor.reDraw);
    };

    // Main animation method
    constructor.animateShape = function(s, delay){
        //console.log(delay);
        var pos = {
            x: s.x,
            y: s.y,
            radius: s.radius
        };

        var newPos = {
            radius: pos.radius + 250,
            x: pos.x + 50,
            y: pos.y + 50,
            alpha: Math.random()
        };

        TweenMax.to(s, constructor.animationSpeed, {
            radius: pos.radius * 3,
            x: newPos.x * 3,
            autoAlpha: newPos.alpha,
            delay: delay,
            ease: Power0.easeNone,
            onComplete: function(){
                TweenMax.to(s, constructor.animationSpeed, {
                    radius: pos.radius,
                    delay:delay,
                    autoAlpha: 1,
                    ease: Power0.easeNone,
                    onComplete: function(){
                        setTimeout(function(){
                            //constructor.animateShape(shapes[shapes.indexOf(s) + 1] || 0);
                            constructor.animateShape(s);
                        }, delay * 1000);
                    }
                });
            }
        });
    };

    // init everything
    constructor.init();
}

if (WIDTH > 680 && WIDTH < 1600){

    var Scene = new CanvasScene(10, 85, 50, true);

}
