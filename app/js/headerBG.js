window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//function getProbability(percents) {
//    return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
//}
//
function getRandInterval(min, max) {
    return (Math.random() * (max - min) + min);
}

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
    //  _this.alpha = 1;

        this.draw = function(ctx){
            ctx.beginPath();
            ctx.fillStyle = 'rgba('+ _this.color +', 1)';
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);

             //Enable just for some comets after figure out the movement
            //if(_this.comet){
            //    for(var i = 0; i < 30; i++){
            //
            //        ctx.fillStyle = 'rgba('+ _this.color +', '+ (1 - (1 / 20) * i)+')';
            //        ctx.rect(_this.x - _this.dx / 4 * i, _this.y - _this.dy / 4 * i - 2, 2, 2);
            //        ctx.fill();
            //    }
            //
            //}

            //if(_this.radius > 1.48){
            //    //var next = bubbles[1];
            //    var index = bubbles.map(function(obj, index) {
            //        if((obj.x - _this.x < 10 || obj.y - _this.y < 10) && (obj.x + _this.x < 10 || obj.y + _this.y < 10)) {
            //            return index;
            //        }
            //    }).filter(isFinite);
            //
            //    var next = bubbles[index] || bubbles[0];
            //
            //
            //    ctx.beginPath();
            //    ctx.moveTo(_this.x, _this.y);
            //    ctx.lineTo(next.x, next.y);
            //    ctx.strokeStyle = 'rgba('+ colors[1] +', 0.3)';
            //    ctx.stroke();
            //    //console.log('Line!');
            //}


            ctx.closePath();
            ctx.fill();
        };

        return this;
    }

    function path(){
        var mousePos= { x: window.innerWidth >> 1, y: window.innerHeight >> 1 },
            polygonRadius = 40,
            radius= parseInt(polygonRadius, 10);

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

            //ctx.beginPath();
            //ctx.moveTo(mousePos.x, mousePos.y);
            //ctx.lineTo(mousePos.x - (Math.round(Math.random() * radius - radius * 0.5)), mousePos.y - (Math.round(Math.random() * radius - radius * 0.5)));
            //ctx.lineTo(mousePos.x - (Math.round(Math.random() * radius - radius * 0.5)), mousePos.y - (Math.round(Math.random() * radius - radius * 0.5)));
            //ctx.lineTo(mousePos.x - (Math.round(Math.random() * radius - radius * 0.5)), mousePos.y - (Math.round(Math.random() * radius - radius * 0.5)));
            //ctx.strokeStyle = 'rgba('+ colors[1] +', 0.3)';
            //ctx.stroke();
            //ctx.closePath();
        }

        //console.log('Line!');

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

        var newPos = {
            x: Math.random() * (star.x - star.dx),
            y: Math.random() * (star.y + star.dy)
        };

       var distance = HEIGHT / 2;

       TweenMax.to(star, 5, {
           bezier:{
               type:"cubic",
               values:[
                   {
                       x: star.x,
                       y: star.y
                   },
                   {
                       x: star.x + 20,
                       y: star.y + 20
                   },
                   {
                       x: star.x - 40,
                       y: star.y + 20
                   },
                   {
                       x: star.x - 20,
                       y: star.y + 40
                   }
               ],
               autoRotate:["x","y","rotation", 0, true]
           },
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
