window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function Space(){
    var canvas = document.getElementById('welcome'),
        ctx = canvas.getContext('2d'),
        WIDTH = canvas.width = window.innerWidth,
        HEIGHT = canvas.height = window.innerHeight,
        bubbles = [],
        colors = ['204, 196, 123', '0, 214, 255', '179, 243, 255', '7, 108, 127', '143, 194, 204'];

    function initSpace(){
        generate();
        loop();
        setTimeout(function(){
            path();
        }, 3000);
    }

    function Bubble(x, y, radius, color) {
        var _this = this;
        _this.x = x || canvas.width / 2;
        _this.y = y || canvas.height / 2;
        _this.dx = Math.random() * 2;
        _this.dy = Math.random() * 2;
        _this.radius = radius || 2;
        _this.color = color;
        _this.newColor = null;
        _this.comet = null;

        this.draw = function(ctx){
            ctx.beginPath();
            ctx.fillStyle = 'rgba('+ _this.color +', 1)';
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        };

        return this;
    }

    function path(){
        for(var j = 0; j < 6; j++){
            ctx.beginPath();
            ctx.moveTo(WIDTH /2 , HEIGHT / 2);
            ctx.lineTo(bubbles[10 + j].x, bubbles[10 + j].y);
            ctx.moveTo(WIDTH /2 , HEIGHT / 2);
            ctx.lineTo(bubbles[100 + j].x, bubbles[100 + j].y);
            ctx.moveTo(WIDTH /2 , HEIGHT / 2);
            ctx.lineTo(bubbles[820 + j].x, bubbles[820 + j].y);
            ctx.strokeStyle = 'rgba('+ colors[1] +', 0.3)';
            ctx.stroke();
        }
    }



    function generate(){
        for(var i = 0; i < 2000; i++){
            var x = Math.random() * WIDTH,
                y = Math.random() * HEIGHT,
                radius = 0.01,
                color = colors[Math.floor(i%colors.length)];
//         alpha = 1;
            var dot = new Bubble(x, y, radius, color);

            bubbles.push(dot);
        }
        //console.log(bubbles);
        draw();
    }

    function draw() {
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].draw(ctx);
            animate(bubbles[i]);
        }

    }

    function animate(dot){
        var current = dot;
        var nSize = Math.random() * 1.5;
        dot.comet = nSize > 1.45;
        TweenMax.to(current, 3, {
            radius: nSize,
            delay: Math.random() * 3,
            ease: Linear.easeInOut,
            onComplete: function(){
                moveStar(dot);
            }
        });
    }

   function moveStar(star){

       TweenMax.to(star, 2, {
           //bezier:{
           //    type:"cubic",
           //    values:[
           //        {
           //            x: star.x,
           //            y: star.y
           //        },
           //        {
           //            x: star.x + 20,
           //            y: star.y + 20
           //        },
           //        {
           //            x: star.x - 40,
           //            y: star.y + 20
           //        },
           //        {
           //            x: star.x,
           //            y: star.y + 40
           //        }
           //    ],
           //    autoRotate:["x","y","rotation", 0, true]
           //},
           x: Math.random() * WIDTH,
           y: Math.random() * HEIGHT,
           ease:Power1.easeInOut
       });

    }

    function loop(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].draw(ctx);
        }
        path();
        requestAnimationFrame(loop);
    }

    initSpace();
}

var space = new Space();
