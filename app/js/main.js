
function Scene(){
    var self = this;

    self.init = function(){
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

    self.init();
}

var scene = new Scene();