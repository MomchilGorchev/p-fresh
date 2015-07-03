// remove frame margin and scrollbars when max out size of canvas
var docstyle = document.body.style;
docstyle.margin="0px";
docstyle.overflow="hidden";

// get dimensions of window and resize the canvas to fit
var win = window,
    width = win.innerWidth,
    height = win.innerHeight,
    canvas = document.getElementById("c"),
    mousex = width/2, mousey = height/2;
canvas.width=width;
canvas.height=height;

// get 2d graphics context and set global alpha
var G=canvas.getContext("2d");
G.globalAlpha=0.3;

// setup aliases
var M = Math,
    Rnd = M.random,
    Sin = M.sin,
    Floor = M.floor;

// constants and storage for objects that represent star positions
var warpZ = 10,
    units = 500,
    freq = 0.3,
    stars = [],
    cycle = 0,
    Z = 0.1;

// mouse events
function addCanvasEventListener(name, fn)
{
    canvas.addEventListener(name, fn, false);
}
addCanvasEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
});
function wheel (e) {
    var delta = 0;
    if (e.detail)
    {
        delta = -e.detail / 3;
    }
    else
    {
        delta = e.wheelDelta / 120;
    }
    if (delta > 0 && Z < 1 || delta < 0 && Z > 0.1)
    {
        Z += (delta/25);
    }
}
addCanvasEventListener("DOMMouseScroll", wheel);
addCanvasEventListener("mousewheel", wheel);

// function to reset a star object
function resetstar(a)
{
    a.x = (Rnd() * width - (width * 0.5)) * warpZ;
    a.y = (Rnd() * height - (height * 0.5)) * warpZ;
    a.z = warpZ;
    a.px = 0;
    a.py = 0
}

// initial star setup
for (var i=0, n; i<units; i++)
{
    n = {};
    resetstar(n);
    stars.push(n);
}

// star rendering anim function
setInterval(function()
{
    // clear background
    G.fillStyle = "#000";
    G.fillRect(0, 0, width, height);

    // mouse position to head towards
    var cx = (mousex - width / 2) + (width / 2),
        cy = (mousey - height / 2) + (height / 2);

    // update all stars
    for (var i=0; i<units; i++)
    {
        var n = stars[i],            // the star
            xx = n.x / n.z,          // star position
            yy = n.y / n.z,
            e = 1.0 / n.z*5+1,       // size i.e. z
        // rgb colour from a sine wave
            r = Sin(freq * i + cycle) * 64 + 190,
            g = Sin(freq * i + 2 + cycle) * 64 + 190,
            b = Sin(freq * i + 4 + cycle) * 64 + 190;

        if (n.px != 0)
        {
            G.strokeStyle = "rgb(" + Floor(r) + "," + Floor(g) + "," + Floor(b) + ")";
            G.lineWidth = e;
            G.beginPath();
            G.moveTo(xx + cx, yy + cy);
            G.lineTo(n.px + cx, n.py + cy);
            //G.closePath();
            G.stroke();
        }

        // update star position values with new settings
        n.px = xx;
        n.py = yy;
        n.z -= Z;

        // reset when star is out of the view field
        if (n.z < Z || n.px > width || n.py > height)
        {
            // reset star
            resetstar(n);
        }
    }

    // colour cycle sinewave rotation
    cycle += 0.1;
}, 25);