
//TODO improve this
// Improve the initali animation sequence
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

function Space(){
    // Initial
    var canvas = document.getElementById('welcome'),
        ctx = canvas.getContext('2d'),
        WIDTH = canvas.width = window.innerWidth,
        HEIGHT = canvas.height = window.innerHeight,
        colors = ['204, 196, 123', '0, 214, 255', '179, 243, 255', '7, 108, 127', '143, 194, 204'],

        centerX = WIDTH/2, centerY = HEIGHT/ 2,
        warpZ = 7,
        units = 300,
        stars = [],
        Z = 0.12,
        M = Math,
        Rnd = M.random;
    ctx.globalAlpha = 0.5;

    //setInterval(function(){
    //    if(units < 300){
    //        units += 50;
    //    }
    //    generate();
    //}, 5000);

    function randomIndex(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    function initSpace(){
        generate();

        loop();
    }

    function resetBubble(a){
        a.x = (Rnd() * WIDTH - (WIDTH * 0.5)) * warpZ;
        a.y = (Rnd() * HEIGHT - (HEIGHT * 0.5)) * warpZ;
        a.z = warpZ;
        a.px = 0;
        a.py = 0
    }

    function generate(){
        for (var i = 0, n; i < units; i++){
            n = {};
            resetBubble(n);
            stars.push(n);
        }
    }

    function loop(){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.66)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        //// mouse position to head towards
        var cx = (centerX - WIDTH / 2) + (WIDTH / 2),
            cy = (centerY - HEIGHT / 2) + (HEIGHT / 2);

        // update all stars
        for (var i = 0; i < units; i++){
            var n = stars[i],            // the star
                xx = n.x / n.z,          // star position
                yy = n.y / n.z,
                radius = 1.0 / n.z * 1.5 + 1;      // size i.e. z

            ctx.fillStyle = 'rgb(' + randomIndex(colors) + ')';
            if (n.px != 0){
                ctx.beginPath();
                ctx.arc(xx + cx, yy + cy, radius, 0, Math.PI * 2, true);
                ctx.arc(n.px + cx, n.py + cy, radius, 0, Math.PI * 2, true);
                //ctx.arc(n.px - xx, n.py - yy, radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
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

