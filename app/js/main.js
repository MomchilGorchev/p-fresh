/**
 * Main title and CTA button
 */
/**
 * Util function for proper animation sequence every time
 * Uses CSS3 transitions
 * @param menuTrigger - trigger
 */

var util = util || {};
var TweenMax = TweenMax || {};
var space;
function menuToggleAnim(menuTrigger){
    'use strict';
    // Cache elements
    var container = menuTrigger.parentNode,
        menuContent = container.querySelector('.menu__content'),
        menuList = menuContent.querySelector('.menu__list'),
        openClassName = 'open', animClassName = 'spin';
    // If nav is closed
    if(!util.hasClass(menuContent, openClassName)){
        util.toggleClass(menuTrigger, animClassName);
        util.toggleClass(menuContent, openClassName);
        setTimeout(function(){
            util.toggleClass(menuList, openClassName);
        }, 500);
    // Else its open
    } else {
        util.toggleClass(menuTrigger, animClassName);
        util.toggleClass(menuList, openClassName);
        setTimeout(function(){
            util.toggleClass(menuContent, openClassName);
        }, 300);
    }
}
/**
 * Navigation panel open/close
 */
function menuToggle(){
    'use strict';
    document.getElementById('menu__trigger').addEventListener('click', function(e){
        e.preventDefault();
        menuToggleAnim(this);
    });
}
/**
 * Main nav handler
 */
function menuItemClick(){
    'use strict';
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
            menuToggleAnim(menuTrigger);
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
 * Check position and animate SVG
 */
function svgHeaders(){
    'use strict';
    var svgs = document.querySelectorAll('.svg-header');
    // Set to false initiallyq
    var scrolling = false;
    window.onscroll = checkAndAnimate;
    function checkAndAnimate() {
        // Animate header SVG if in range
        for(var i = 0; i < svgs.length; i++){
            if(window.pageYOffset > svgs[i].offsetTop - window.innerHeight / 1.2){
                util.addClass(svgs[i], 'active');
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
}

function handleHighDPI(){
    'use strict';
    if ( (window.devicePixelRatio) && (window.devicePixelRatio >= 2) ){
        var images = document.querySelectorAll('.handle-high-dpi');
        for(var i = 0; i < images.length; i++){
            var current = images[i];
            var highDpiSrc = current.getAttribute('data-ddpi');
            current.setAttribute('src', highDpiSrc);
        }
    }
}

/**
 * Overlay open/close handling
 */
function overlayToggle(){
    'use strict';
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
            var content = util.closest(this, 'figure')
                .cloneNode(true).querySelector('.project__modal-details');
            contentBox.appendChild(content);

            // Assign dynamically event-handlers to the 'Show-more' icon
            var triggerId = content.getAttribute('data-trigger');
            var trigger = document.getElementById(triggerId);
            // Show the overlay
            util.toggleClass(overlay, 'open');
            util.toggleClass(body, 'overlay-open');

            // Utility fn to determine the scrolled position
            function getOverlayPosition(){
                var elPosY = overlay.scrollTop;
                var viewport = window.innerHeight;
                // If under the half of the window height
                if(elPosY > viewport / 2){
                    util.addClass(trigger, 'go-back');
                    return 'below';
                } else {
                    util.removeClass(trigger, 'go-back');
                    return 'above';
                }
            }

            // Check on scroll
            overlay.addEventListener('scroll', function(e){
                getOverlayPosition();
            });

            // Scroll to the target and rotate the icon as well
            trigger.addEventListener('click', function(e){
                e.preventDefault();
                // Get the target element
                var target = document.getElementById(triggerId + '-details');
                // Important, normal scroll on the window element won't work
                // because the overlay is fixed to take the whole screen
                // The solution is to apply scroll on the overlay

                // When assigning the event listener check
                // to decide which way to scroll
                var overlayPosition = getOverlayPosition();
                if(overlayPosition === 'below'){
                    // Scroll to the top
                    TweenMax.to(overlay, 1, {
                        delay: 0.2,
                        scrollTo: {
                            y: overlay.offsetTop
                        },
                        ease: Power4.easeInOut,
                        onComplete: function(){
                            // Switch off the class
                            util.removeClass(trigger, 'go-back');
                        }
                    });
                } else {
                    TweenMax.to(overlay, 1,{
                        // Scroll to the content
                        delay:0.2,
                        scrollTo: {
                            y: target.offsetTop + 100
                        },
                        ease: Power4.easeInOut,
                        onComplete: function(){
                            // Switch on the class
                            util.addClass(trigger, 'go-back');
                        }
                    });
                }
            });
        });
    }

    // Close btn logic
    closeTrigger.addEventListener('click', function(e){
        e.preventDefault();
        util.addClass(closeTrigger, 'closing');

        // Little delay
        setTimeout(function(){
            // Remove content
            var content = contentBox.querySelector('.project__modal-details');
            content.parentNode.removeChild(content);
            // And close the overlay
            util.toggleClass(overlay, 'open');
            util.toggleClass(body, 'overlay-open');
            util.removeClass(closeTrigger, 'closing');
        }, 300);
    });

}

/**
 * Validates form and display error messages
 */
function formSubmitHandler(){
    'use strict';
    var form = document.querySelector('#contact__me');
    var btn = form.querySelector('.contact__form-submit');
    var btnStates = btn.querySelector('.submit__states');

    form.onsubmit = function(e){
        e.preventDefault();
        var inputs = {
            name: form.querySelector('.name'),
            email: form.querySelector('.email'),
            message: form.querySelector('.message')
        };
        // Get user input
        var formData = {
            name: inputs.name.value,
            email: inputs.email.value,
            subject: 'New email',
            message: inputs.message.value
        };
        // Validate user input
        var validateObj = util.validateForm(formData);
        console.log(validateObj);
        // Send form
        if(validateObj.valid){
            // Start processing
            // Disable btn
            btn.setAttribute('disabled', 'disabled');
            util.addClass(btn, 'processing');
            util.addClass(btnStates, 'loading');
            // Init request
            var request = new XMLHttpRequest();
            request.open('POST', 'http://1782345.62/mail', true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // Define success handler
            request.onload = function(res){
                console.log(res);
                // Animate button and reset form
                util.addClass(btnStates, 'done');
                for (var key in inputs) {
                    if (inputs.hasOwnProperty(key)) {
                        inputs[key].value = '';
                    }
                }
                // Switch to initial state
                util.removeClass(btnStates, 'done');
                util.removeClass(btnStates, 'loading');
                util.toggleClass(btn, 'processing');
                btn.removeAttribute('disabled');
            };
            // Define error handler
            request.onerror = function(err) {
                console.log(err);
                var responseError = document.querySelector('.contact__form__request-fail');
                //TODO abstract to function
                util.addClass(responseError, 'shown');
                util.removeClass(btnStates, 'loading');
                util.toggleClass(btn, 'processing');
                btn.removeAttribute('disabled');
                setTimeout(function(){
                    util.removeClass(responseError, 'shown');
                }, 5000);
            };
            // Send
            request.send(JSON.stringify(formData));

        // Display error messages
        } else {
            // Each field failed to validate will be returned in an array
            for(var i = 0; i < validateObj.fields.length; i++){
                // Select right element
                var el = form.querySelector('.'+ validateObj.fields[i]);
                // And display the error message
                var errMsg = el.parentNode.querySelector('.contact__form-error');
                util.addClass(errMsg, 'active');
            }

            setTimeout(function(){
                var errs = document.querySelectorAll('.contact__form-error');
                for(var j = 0; j < errs.length; j++){
                    util.toggleClass(errs[j], 'active');
                }
            }, 2000);
            console.log('no!');
        }
    };
}

/**
 * Main CTA btn handler
 */
function launchSite(){
    'use strict';
    var launch = document.querySelector('.main__trigger');
    var btnStates = launch.querySelector('.submit__states');
    // Attach event
    launch.addEventListener('click', function(e){
        //space.warpZ = 2;
        e.preventDefault();
        var target = document.querySelector('#projects');
        var scene = document.querySelector('#scene');
        setTimeout(function(){
            // Scale down the canvas for slicker animation
            util.toggleClass(scene, 'scaled');
            // Add Class to the btn
            util.toggleClass(launch, 'processing');
            // And disable it
            util.toggleClass(btnStates, 'loading');
            // Scroll the window to the target location
            TweenMax.to(window, 1,{
                delay:0.6,
                scrollTo: {
                    y: target.offsetTop
                },
                ease: Power4.easeInOut,
                onComplete: function(){

                    // On complete scale back the canvas
                    util.toggleClass(scene, 'scaled');
                    // And reset the button state
                    util.toggleClass(launch, 'processing');
                    util.toggleClass(btnStates, 'loading');
                    //space.warpZ = 5;

                }
            });
        }, 200);

    });
}

/**
 * Init the website
 * @constructor
 */
function Scene(){
    'use strict';
    var self = this;
    self.init = function(){
        // Cache elements
        var header = document.querySelector('header');
        var ctaBtn = document.querySelector('#main-cta');
        var preloader = document.querySelector('#preloader');
        // Chain animation
        // First timeout to remove the preloader
        setTimeout(function(){
            util.addClass(preloader, 'done');
            setTimeout(function(){
                preloader.parentNode.removeChild(preloader);
            }, 800);
            // Animate the title TODO - needs refactoring
            TweenMax.to(header, 0.3, {
                y: -5,
                opacity: 1,
                delay: 0.7,
                ease: Power0.easeNone,
                onComplete: function(){
                    // And the button a bit later
                    TweenMax.to(ctaBtn, 0.3, {
                        y: -5,
                        opacity: 1,
                        ease: Power4.easeInOut,
                        onComplete: function(){
                            // Init the canvas animation around 1000-1100ms after we hide the preloader
                            setTimeout(function(){
                                space = new Space();


                            }, 300);
                        }
                    });
                }
            });
        }, 1500);

        // Init the rest of the functionality
        svgHeaders();
        launchSite();
        menuToggle();
        menuItemClick();
        handleHighDPI();
        overlayToggle();
        formSubmitHandler();
    };

    self.init();
}
// Start
var sceneLoaded = new Scene();




