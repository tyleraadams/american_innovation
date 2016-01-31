const utils = {};

utils.timeoutDelay = 200;

utils.delayHide = function (hideableItem)  {
  const hide = () => {
    hideableItem.hide()
  }
  setTimeout(hide, this.timeoutDelay);
};

utils.isAllValid = function(messages) {
    let hasAnyProps = true;
    for (var key in messages) {
        hasAnyProps = false;
        break;
    }

    return hasAnyProps;
};

utils.validateForm = function(form) {

    let messages = Object.assign({}, form);

    for (var field in form) {
        // put all validations here
        // name should be all letters
        // phone should be 10 digits
        // email should be valid email with @ and .com, and at least one char in between each
        // check for empty after trim
        form[field] = form[field].trim();
        if (form[field] === '') {
            messages[field] = `${field.toUpperCase()} is a required field`;
        } else if (field === 'name' && !/^[A-Za-z\s]+$/.test(form[field])) {
            messages[field] = `${field.toUpperCase()} should be letter and spaces only`
        } else if (field === 'phone' && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(form[field])) {
            messages[field] = `${field.toUpperCase()} must be a valid phone number`
        } else if (field === 'email' && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form[field])) {
            messages[field] = `${field.toUpperCase()} must be a valid email`
        } else {
            delete messages[field];
        }
    }

    return messages;
};

export default utils;
