window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function Space(){
    var canvas = document.getElementById('welcome'),
        ctx = canvas.getContext('2d'),
        WIDTH = canvas.width = window.innerWidth,
        HEIGHT = canvas.height = window.innerHeight,
        colors = ['204, 196, 123', '0, 214, 255', '179, 243, 255', '7, 108, 127', '143, 194, 204'],
        docStyle = document.body.style,
        mousex = WIDTH/2, mousey = HEIGHT/2;
        warpZ = 10,
        units = 500,
        freq = 0.3,
        stars = [],
        cycle = 0,
        Z = 0.1,
        M = Math,
        Rnd = M.random,
        Sin = M.sin,
        Floor = M.floor;

    docStyle.margin="0px";
    //ctx.globalAlpha = 0.3;


    function initSpace(){
        console.log('initSpace called');
        generate();
        loop();
        //setTimeout(function(){
        //    path();
        //}, 3000);
    }

    function resetBubble(a){
        a.x = (Rnd() * WIDTH - (WIDTH * 0.5)) * warpZ;
        a.y = (Rnd() * HEIGHT - (HEIGHT * 0.5)) * warpZ;
        a.z = warpZ;
        a.px = 0;
        a.py = 0
    }

    //function Bubble(x, y, radius, color) {
    //    var _this = this;
    //    _this.x = x || canvas.width / 2;
    //    _this.y = y || canvas.height / 2;
    //    _this.dx = Math.random() * 2;
    //    _this.dy = Math.random() * 2;
    //    _this.radius = radius || 2;
    //    _this.color = color;
    //    _this.newColor = null;
    //    _this.comet = null;
    //
    //    this.draw = function(ctx){
    //        ctx.beginPath();
    //        ctx.fillStyle = 'rgba('+ _this.color +', 1)';
    //        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
    //        ctx.closePath();
    //        ctx.fill();
    //    };
    //
    //    return this;
    //}


    function generate(){
        for (var i = 0, n; i < 1500; i++){
            n = {};
            resetBubble(n);
            stars.push(n);
        }
    }

    //function animate(dot){
    //    var current = dot;
    //    var nSize = Math.random() * 1.5;
    //    dot.comet = nSize > 1.45;
    //    TweenMax.to(current, 3, {
    //        radius: nSize,
    //        delay: Math.random() * 3,
    //        ease: Linear.easeInOut
    //        //onComplete: function(){
    //        //    moveStar(dot);
    //        //}
    //    });
    //}

    function loop(){
        //console.log('loop called')
        // clear background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        // mouse position to head towards
        var cx = (mousex - WIDTH / 2) + (WIDTH / 2),
            cy = (mousey - HEIGHT / 2) + (HEIGHT / 2);

        // update all stars
        for (var i = 0; i < units; i++){
            var n = stars[i],            // the star
                xx = n.x / n.z,          // star position
                yy = n.y / n.z,
                e = 1.0 / n.z*5+1,       // size i.e. z
            // rgb colour from a sine wave
                r = Sin(freq * i + cycle) * 64 + 190,
                g = Sin(freq * i + 2 + cycle) * 64 + 190,
                b = Sin(freq * i + 4 + cycle) * 64 + 190;

            if (n.px != 0){
                ctx.strokeStyle = "rgb("+ colors[Math.floor(Math.random() * colors.length)] +")";
                ctx.lineWidth = e;
                ctx.beginPath();
                ctx.moveTo(xx + cx, yy + cy);
                ctx.lineTo(n.px + cx, n.py + cy);
                //G.closePath();
                ctx.stroke();
            }

            // update star position values with new settings
            n.px = xx;
            n.py = yy;
            n.z -= Z;

            // reset when star is out of the view field
            if (n.z < Z || n.px > WIDTH || n.py > HEIGHT){
                // reset star
                resetBubble(n);
            }
        }
        requestAnimationFrame(loop);
    }

    initSpace();
    console.log(stars);
}

var space = new Space();
