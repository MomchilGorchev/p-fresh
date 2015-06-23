window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById('welcome'),
    ctx = canvas.getContext('2d'),
    WIDTH = canvas.width = window.innerWidth,
    HEIGHT = canvas.height = window.innerHeight,
    bubbles = [],
    colors = ['204, 196, 123', '0, 214, 255', '179, 243, 255', '7, 108, 127', '143, 194, 204'];


function Bubble(x, y, radius, color) {
    var _this = this;
    _this.x = x || canvas.width / 2;
    _this.y = y || canvas.height / 2;
    _this.radius = radius || 2;
    _this.color = color;
    _this.newColor = null;
//   _this.alpha = 1;

    this.draw = function(ctx){
        //_this.alpha = self.starAlpha || Math.random();
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba('+ _this.color +', 1)';
        //ctx.strokeStyle = 'rgba('+_this.color+', '+_this.alpha+')';
        //ctx.stroke();
        ctx.fill();
    };

    return this;
}

function generate(){
    for(var i = 0; i < 1000; i++){
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
    //var nColor = nSize >= 1.5 ? '255, 0, 0, 1' : '0, 255, 0, 1';
    /* TweenMax.to(current, 1, {
     x: Math.random(),
     ease: Linear.noEase
     });*/
    //dot.newColor = ncolor;
    TweenMax.to(current, 3, {

        radius: nSize,
        delay: Math.random() * 3,
        ease: Linear.easeInOut
    });
}



function loop(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].draw(ctx);
    }
    requestAnimationFrame(loop);
}
loop();
document.addEventListener('DOMContentLoaded', function(){
    generate();
});
