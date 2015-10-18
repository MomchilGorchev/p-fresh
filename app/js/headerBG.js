/**
 * Hero's canvas and initial animation sequence scripts
 */
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

console.log(util.mobileDevice());

/**
 * Main canvas scene
 * @constructor
 */
function Space(){
    // Initial
    'use strict';
    var _this = this;
    var canvas = document.getElementById('welcome'),
        ctx = canvas.getContext('2d'),
        WIDTH = canvas.width = window.innerWidth,
        HEIGHT = canvas.height = window.innerHeight,
        centerX = WIDTH/2, centerY = HEIGHT/ 2,
        cx = centerX,
        cy = centerY,
        units = 150,
        stars = [],
        Z = 0.09,
        M = Math,
        Rnd = M.random,
        alpha = 0.05,
        colors = ['204, 196, 123', '0, 214, 255', '179, 243, 255', '7, 108, 127', '143, 194, 204'];

    ctx.globalAlpha = 0.66;
    _this.warpZ = 8;

    // Increase the alpha every 700 ms for smooth animation
    var alphaIncrease = setInterval(function(){
        if(alpha < 1) {
            alpha += 0.05;
        } else {
            clearInterval(alphaIncrease);
        }
    }, 400);

    // Returns random array index
    function randomIndex(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    // Init loop
    function initSpace(){
        generate();
        loop();
    }

    // Calculate position
    function resetBubble(a){
        a.x = (Rnd() * WIDTH - (WIDTH * 0.5)) * _this.warpZ;
        a.y = (Rnd() * HEIGHT - (HEIGHT * 0.5)) * _this.warpZ;
        a.z = _this.warpZ;
        a.px = 0;
        a.py = 0;
    }

    // First position
    function generate(){
        for (var i = 0, n; i < units; i++){
            n = {};
            resetBubble(n);
            stars.push(n);
        }
    }

    // Main animation sequence
    function loop(){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.66)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // update all stars
        for (var i = 0; i < units; i++){
            var n = stars[i],
                xx = n.x / n.z,          // star position
                yy = n.y / n.z,
                radius = 1.0 / n.z * 1.5 + 1;      // size i.e. z

            ctx.fillStyle = 'rgba(' + randomIndex(colors) + ', '+ alpha +')';
            //console.log(ctx.fillStyle);
            if (n.px !== 0){
                ctx.beginPath();
                // Longer star trace - disabled for performance
                //for(var j = 0; j < 5; j++){
                //    ctx.arc(xx + cx + j * (radius / n.z), yy + cy + (j * radius / n.z), radius, 0, Math.PI * 2, true);
                //}
                ctx.arc(xx + cx, yy + cy, radius, 0, Math.PI * 2, true);
                ctx.arc(n.px + cx, n.py + cy, radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                // Sick animation looking like the black hole in Interstellar movie!
                //for(var k = 0; k < 10; k++){
                //    ctx.arc(xx * k + cx, yy + cy, radius, 0, Math.PI * 2, true);
                //    ctx.arc(n.px * k + cx, n.py + cy, radius, 0, Math.PI * 2, true);
                //    ctx.closePath();
                //    ctx.fill();
                //}
                // Crazy stuff
                //ctx.arc(x0 + cx * (radius / n.z), y0 + cy + (j * radius / n.z), radius, 0, Math.PI * 2, true);
                //

                // Add more arc with descending x and y positions to make longer star trace.
                // Need optimisations as if enabled lower down the FPS slightly
                //ctx.beginPath();
                //ctx.arc(n.px / 2 + cx, n.py / 2 + cy, radius, 0, Math.PI * 2, true);
                //ctx.closePath();
                //ctx.fill();
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
}

