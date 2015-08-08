/**
 * Main title and CTA button
 */
(function Scene(){
    var self = this;

    self.init = function(){

        var header = document.querySelector('header');
        var ctaBtn = document.querySelector('#main-cta');
        // Animate the header
        TweenMax.to(header, 0.6, {
            opacity: 1,
            ease: Power4.easeIn,
            onComplete: function(){
                // And the button a bit later
                TweenMax.to(ctaBtn, 0.3, {
                    y: -10,
                    opacity: 1,
                    ease: Power4.easeInOut
                });
            }
        });
    };

    self.init();
}());


/**
 * Util function for proper animation sequence every time
 * Uses CSS3 transitions
 * @param menuTrigger - trigger
 */
function clickHandle(menuTrigger){
    // Cache elements
    var container = menuTrigger.parentNode,
        menuContent = container.querySelector('.menu__content'),
        menuList = menuContent.querySelector('.menu__list'),
        openClassName = 'open', animClassName = 'spin';
    // If nav is closed
    if(!hasClass(menuContent, openClassName)){
        toggleClass(menuTrigger, animClassName);
        toggleClass(menuContent, openClassName);
        setTimeout(function(){
            toggleClass(menuList, openClassName);
        }, 500);
    // Else its open
    } else {
        toggleClass(menuTrigger, animClassName);
        toggleClass(menuList, openClassName);
        setTimeout(function(){
            toggleClass(menuContent, openClassName);
        }, 300);
    }
}
/**
 * Navigation panel open/close
 */
function menuHandler(){
    var menuTrigger = document.getElementById('menu__trigger');
    menuTrigger.addEventListener('click', function(e){
        e.preventDefault();
        clickHandle(this);
    });
}

/**
 * Main nav handler
 */
function menuClick(){
    var menuItems = document.querySelectorAll('.menu__list-item');
    var menuTrigger = document.getElementById('menu__trigger');
    // Assign event-handlers to all links
    for(var i = 0; i < menuItems.length; i++){
        var item = menuItems[i];
        item.addEventListener('click', function(e){
            e.preventDefault();
            // Get the target
            var href = this.querySelector('a').getAttribute('href');
            var DOMElement = document.querySelector(href);
            // Call util function to handle open/close animation sequence
            clickHandle(menuTrigger);
            // Scroll the window to the target
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

/**
 * Main CTA btn handler
 */
function launchSite(){
    var launch = document.querySelector('.main__trigger');
    // Attach event
    launch.addEventListener('click', function(e){
        e.preventDefault();
        var target = document.querySelector('#projects');
        var scene = document.querySelector('#scene');
        // Scale down the canvas for slicker animation
        toggleClass(scene, 'scaled');
        // Scroll the window el to the target location
        TweenMax.to(window, 1,{
            delay:0.6,
            scrollTo: {
                y: target.offsetTop
            },
            ease: Power4.easeInOut,
            onComplete: function(){
                // On complete scale back the canvas
                toggleClass(scene, 'scaled');
            }
        });
    })
}

/**
 * Check position and animte SVG
 */
(function svgHeaders(){

    var svgs = document.querySelectorAll('.svg-header');
    // Set to false initiallyq
    var scrolling = false;
    window.onscroll = checkAndAnimate;
    function checkAndAnimate() {
        // Animate header SVG if in range
        for(var i = 0; i < svgs.length; i++){
            if(window.pageYOffset > svgs[i].offsetTop - window.innerHeight / 1.2){
                addClass(svgs[i], 'active');
            }
        }
        // Set the flag
        scrolling = true;
    }
    // Only fire 100ms later for better performance
    setInterval(function() {
        if(scrolling) {
            // Reset flag
            scrolling = false;
        }
    }, 100);

}());

/**
 * Overlay open/close handling
 */
function projectOverlay(){
    // Cache all necessary elements
    var triggers = document.querySelectorAll('.open-overlay');
    var overlay = document.querySelector('#projects__overlay');
    var contentBox = overlay.querySelector('.projects__overlay-content');
    var closeTrigger = overlay.querySelector('.close');
    var body = document.querySelector('body');

    // Assign event-handlers to the overlay triggers
    for(var i = 0; i < triggers.length; i ++){
        var current = triggers[i];
        current.addEventListener('click', function(e){
            e.preventDefault();
            // Clone related content to the overlay
            var content = closest(this, 'figure')
                .cloneNode(true).querySelector('.project__modal-details');
            contentBox.appendChild(content);
            // Show the overlay
            toggleClass(overlay, 'open');
            toggleClass(body, 'overlay-open');

            // Assign dynamically event-handlers to the 'Show-more' icon
            var triggerId = content.getAttribute('data-trigger');
            document.getElementById(triggerId).addEventListener('click', function(e){
                e.preventDefault();
                // Get the target element
                var target = document.getElementById(triggerId + '-details');
                console.log(target.offsetTop);
                // Important, normal scroll on the window element won't work
                // because the overlay is fixed to take the whole screen
                // The solution is to apply scroll on the overlay
                TweenMax.to(overlay, 1,{
                    delay:0.2,
                    scrollTo: {
                        y: target.offsetTop
                    },
                    ease: Power4.easeInOut,
                    onComplete: function(){
                        // Implement trigger fade out here
                        console.log('done');
                    }
                });
            });

        });
    }

    // Close btn logic
    closeTrigger.addEventListener('click', function(e){
        e.preventDefault();
        // Little delay
        setTimeout(function(){
            // Remove content
            var content = contentBox.querySelector('.project__modal-details');
            content.parentNode.removeChild(content);
            // And close the overlay
            toggleClass(overlay, 'open');
            toggleClass(body, 'overlay-open');
        }, 300);
    });
}

function formHandler(){
    var form = document.querySelector('#contact__me');

    form.onsubmit = function(e){
        e.preventDefault();

        var formData = {
            name: form.querySelector('.name').value,
            email: form.querySelector('.email').value,
            message: form.querySelector('.message').value
        };

        if(validateForm(formData)){
            console.log('yes!');
        } else {
            console.log('no!');
        }
    }
}


/*
    Document ready
 */
document.addEventListener('DOMContentLoaded', function(){
    launchSite();
    menuHandler();
    menuClick();
    projectOverlay();
    formHandler();
});