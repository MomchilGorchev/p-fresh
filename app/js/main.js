function toggleClass(el, className){
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

function hasClass(el, className){
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
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
            menuList = menuContent.querySelector('.menu__list'),
            className = 'open';
        if(!hasClass(menuContent, className)){
            toggleClass(menuContent, className);
            setTimeout(function(){
                toggleClass(menuList, className);
            }, 300);
        } else {
            toggleClass(menuList, className);
            setTimeout(function(){
                toggleClass(menuContent, className);
            }, 300);
        }

    });
});