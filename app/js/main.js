
function Scene(){
    var self = this;

    self.init = function(){
        //setTimeout(function(){
        //    var rocketFill = document.getElementById('rocket-fill'),
        //        rocket = document.getElementById('Layer_1').querySelector('path');
        //
        //    TweenMax.to(rocketFill, 0.6, {opacity:1,
        //        ease: Circ.easeInOut,
        //        onComplete: function(){
        //            rocket.setAttribute('fill', '#3b4a49');
        //
        //        }
        //    });
        //}, 1.5);

        self.initTitle();
    };

    self.initTitle = function(){
        var header = document.querySelector('header');
        TweenMax.to(header, 1.8, {
            //y: window.innerHeight / 3,
            opacity: 1,
            ease: Circ.easeOut
        });
    };

    self.init();
}

var scene = new Scene();

/*
    Document ready
 */
document.addEventListener('DOMContentLoaded', function(){
    var menuTrigger = document.getElementById('menu__trigger');
    menuTrigger.addEventListener('click', function(e){
        e.preventDefault();
        var container = menuTrigger.parentNode,
            menuContent = container.querySelector('.menu__content'),
            className = 'open';
        if (menuContent.classList) {
            menuContent.classList.toggle(className);
        } else {
            var classes = menuContent.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            menuContent.className = classes.join(' ');
        }
    });
});