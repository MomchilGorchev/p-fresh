/**
 * Created by momchillgorchev on 18/07/15.
 */

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
function addClass(el, className){
    if (el.classList) {
        el.classList.add(className);
    } else {
        var classes = el.className.split(' ');
        classes.push(className);

        el.className = classes.join(' ');
    }
}

function removeClass(el, className){
    if (el.classList){

        el.classList.remove(className);
    } else {

        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}


function closest(elem, selector) {

    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
            return elem;
        } else {
            elem = elem.parentElement;
        }
    }
    return false;
}

function hasClass(el, className){
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function validateForm(formData){

    if(!formData){
        return false;
    } else {

        var notValidFields = [];
        if(formData.name.length < 1){
            notValidFields.push('name');
        }
        if(!validateEmail(formData.email)){
            notValidFields.push('email');
        }
        if(formData.message.length < 10){
            notValidFields.push('message');
        }

        return {
            valid: formData.name.length > 1
                && validateEmail(formData.email)
                && formData.message.length > 10,
            fields: notValidFields
        };
    }

}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}