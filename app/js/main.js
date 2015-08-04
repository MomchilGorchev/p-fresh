
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

function clickHandle(menuTrigger){
    var container = menuTrigger.parentNode,
        menuContent = container.querySelector('.menu__content'),
        menuList = menuContent.querySelector('.menu__list'),
        openClassName = 'open', animClassName = 'spin';
    if(!hasClass(menuContent, openClassName)){

        toggleClass(menuTrigger, animClassName);
        toggleClass(menuContent, openClassName);
        setTimeout(function(){
            toggleClass(menuList, openClassName);
        }, 500);
    } else {
        toggleClass(menuTrigger, animClassName);
        toggleClass(menuList, openClassName);
        setTimeout(function(){
            toggleClass(menuContent, openClassName);
        }, 300);
    }
}

function menuHandler(){
    var menuTrigger = document.getElementById('menu__trigger');

    menuTrigger.addEventListener('click', function(e){
        e.preventDefault();
        clickHandle(this);
    });
}

function menuClick(){
    var menuItems = document.querySelectorAll('.menu__list-item');
    var menuTrigger = document.getElementById('menu__trigger');
    for(var i = 0; i < menuItems.length; i++){
        var item = menuItems[i];
        item.addEventListener('click', function(e){
            e.preventDefault();
            var href = this.querySelector('a').getAttribute('href');
            var DOMElement = document.querySelector(href);
            clickHandle(menuTrigger);
            TweenMax.to(window, 1,{
                delay:0.6,
                scrollTo: {
                    y: DOMElement.offsetTop
                },
                ease: Power4.easeInOut
            });
        });
    }
}

function launchSite(){
    var launch = document.querySelector('.main__trigger');

    launch.addEventListener('click', function(e){
        e.preventDefault();
        var target = document.querySelector('#projects');
        var scene = document.querySelector('#scene');
        toggleClass(scene, 'scaled');


        console.log(target);
        TweenMax.to(window, 1,{
            delay:0.6,
            scrollTo: {
                y: target.offsetTop
            },
            ease: Power4.easeInOut,
            onComplete: function(){
                toggleClass(scene, 'scaled');
            }
        });
    })
}


function projectOverlay(){
    var triggers = document.querySelectorAll('.open-overlay');
    var overlay = document.querySelector('#projects__overlay');
    var contentBox = overlay.querySelector('.projects__overlay-content');
    var closeTrigger = overlay.querySelector('.close');
    var body = document.querySelector('body');

    for(var i = 0; i < triggers.length; i ++){
        var current = triggers[i];

        current.addEventListener('click', function(e){
            e.preventDefault();
            var content = closest(this, 'figure').cloneNode(true).querySelector('.project__modal-details');
            contentBox.appendChild(content);
            toggleClass(overlay, 'open');
            toggleClass(body, 'overlay-open');


        });
    }

    closeTrigger.addEventListener('click', function(e){
        e.preventDefault();
        setTimeout(function(){
            var content = contentBox.querySelector('.project__modal-details');
            content.parentNode.removeChild(content);
            toggleClass(overlay, 'open');
            toggleClass(body, 'overlay-open');
        }, 300);
    });
}

function linkTransition(){

    var triggers = document.getElementsByClassName('overlay__trigger__icon');

    for(var i = 0; i < triggers.length; i++){

        var current = triggers[i];
            console.log(i);

        current.addEventListener('click', function(e){
            e.preventDefault();


            var target = this.getAttribute('data-href');
            var DOMElement = document.querySelector('.'+ target);



            TweenMax.to(window, 1,{
                delay:0.3,
                scrollTo: {
                    y: DOMElement.offsetTop
                },
                ease: Power4.easeInOut
            });

        });
    }

}

/*
    Document ready
 */
document.addEventListener('DOMContentLoaded', function(){
    linkTransition();
    launchSite();
    menuHandler();
    menuClick();
    projectOverlay();
});