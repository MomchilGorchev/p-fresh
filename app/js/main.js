
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var canvas = document.getElementById('welcome'),
    ctx = canvas.getContext('2d'),
    WIDTH = canvas.width,
    HEIGHT = canvas.height;

function Scene(ctx){
    var self = this;

    var bubbles = [];

    self.init = function(){
        self.generate();

    };

    function Bubble(x, y, radius, color, alpha) {
        var _this = this;
        _this.x = x || canvas.width / 2;
        _this.y = y || canvas.height / 2;
        _this.radius = radius || 2;
        _this.color = color || 'green';
        _this.alpha = alpha || Math.random();

        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgba(' + _this.color + ', ' + _this.alpha + ')';
            ctx.fill();
        };

    }

    self.generate = function(){
        for(var i = 0; i < 20; i++){

            var x = Math.random() * canvas.width,
                y = canvas.height + 20,
                radius = (Math.random() + 1) * 5,
                color = '#cfcfcf',
                alpha = 0.8;
            var dot = new Bubble(x, y, radius, color, alpha);

            bubbles.push(dot);
        }
        console.log(bubbles);
        draw();
    };

    function draw() {
        console.log('oap')
        for (var i = 0; i > bubbles.length; i++) {
            bubbles[i].draw(ctx);
        }
    }

    self.init();
}

var scene = new Scene(ctx);