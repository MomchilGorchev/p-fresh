
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById('welcome'),
    ctx = canvas.getContext('2d'),
    WIDTH = canvas.width = window.innerWidth,
    HEIGHT = canvas.height = window.innerHeight;

function Scene(ctx){
    var self = this;

    //var bubbles = [];
    //
    //self.color = '145, 56, 108';
    //self.starAlpha = 0;


    self.init = function(){
        //self.generate();
        setTimeout(function(){
            var rocketFill = document.getElementById('rocket-fill'),
                rocket = document.getElementById('Layer_1').querySelector('path');

            TweenMax.to(rocketFill, 0.6, {opacity:1,
                ease: Circ.easeInOut,
                onComplete: function(){
                    rocket.setAttribute('fill', '#3b4a49');
                    self.initTitle();
                }
            });
        }, 1.5);

    };

    self.initTitle = function(){
        var header = document.querySelector('header');
        TweenMax.to(header, 1.8, {
            opacity: 1,
            ease: Circ.easeOut
        });
    };

//    function Bubble(x, y, radius, color) {
//        var _this = this;
//        _this.x = x || canvas.width / 2;
//        _this.y = y || canvas.height / 2;
//        _this.radius = radius || 2;
//        _this.color = color;
//        //   _this.alpha = 1;
//
//        this.draw = function(ctx){
//            //_this.alpha = self.starAlpha || Math.random();
//            ctx.beginPath();
//            ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
//            ctx.closePath();
//            ctx.fillStyle = 'rgba('+ _this.color +')';
//            //ctx.strokeStyle = 'rgba('+_this.color+', '+_this.alpha+')';
//            //ctx.stroke();
//            ctx.fill();
//        };
//
//        return this;
//    }
//
//    function animate(dot){
//
//        var current = dot;
//        var ncolor = '255, 255, 255, 1';
//        /* TweenMax.to(current, 1, {
//         x: Math.random(),
//         ease: Linear.noEase
//         });*/
//        TweenMax.to(current, Math.random() * 2, {colorProps:{
//            color: 'rgba('+ ncolor +')'
//        },
//            delay: Math.random(),
//            ease: Linear.easeInOut,
//            onComplete: function(){
//
//                current.color = ncolor;
//
//            }
//        })
//
//    }
//
//    self.generate = function(){
//        for(var i = 0; i < 100; i++){
//            var x = Math.random() * WIDTH,
//                y = Math.random() * HEIGHT,
//                radius = Math.random() * 3,
//                color = '255, 255, 255, 0';
////         alpha = 1;
//            var dot = new Bubble(x, y, radius, color);
//
//            bubbles.push(dot);
//        }
//        //console.log(bubbles);
//        draw();
//    };
//
//    function draw() {
//        for (var i = 0; i < bubbles.length; i++) {
//            bubbles[i].draw(ctx);
//            animate(bubbles[i]);
//        }
//
//    }

    self.init();
}

var scene = new Scene(ctx);