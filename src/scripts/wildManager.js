import nanoModal from 'nanomodal';
import votingManager from './votingManager';
import innovationsManager from './innovationsManager';
import messageManager from './messageManager';
import validate from 'validate-js';
import moment from 'moment';
import utils from './utils';

let wildManager = {
  init: function () {

    let openModalButton = document.getElementsByClassName('nominate')[0];
    let comeBackDate = moment(JSON.parse(sessionStorage.getItem('currentRound'))['ending_date']).add('days', 1).format('MMMM D');

    let yesButton  = {
      text: 'Submit',
    };
    yesButton.handler = function (modal) {
        let parentEl = event.target.parentElement.parentElement;
        let form = parentEl.querySelector('form');
        let name = form.querySelector('[name=name]').value;
        let phone = form.querySelector('[name=phone]').value;
        let innovation = form.querySelector('[name=innovation]').value;
        let description = form.querySelector('[name=description]').value;
        let email = form.querySelector('[name=email]').value;

        form = {
          "name": name,
          "phone": phone,
          "innovation": innovation,
          "description": description,
          "email": email
        };

        let validationMessages = this.validateForm(form);
        let isAllValid = this.isAllValid(validationMessages);
        if (isAllValid) {
          form = JSON.stringify(form);
          votingManager.submitNomination('/wild', form);
          sessionStorage.setItem('innovationVotedFor', 'nomination');
          hasAlreadyVoted = true;
          innovationsManager.disableButtons();
          utils.delayHide(modal);
          messageManager.showMessage(`Thank you for submiting a nomination. Please check back ${comeBackDate} to see if we chose your submission.`);
          openModalButton.classList.add('disabled');
          openModalButton.classList.add('chosen');
        } else {
          let container = parentEl.getElementsByClassName('wild-messages')[0];
          messageManager.showMessages(container, validationMessages);
        }
    }.bind(this);

    let cancelButton  = {
      text: 'Cancel',
      handler: function(modal) {
        utils.delayHide(modal);
      }
    };

    let hasAlreadyVoted = sessionStorage.getItem('innovationVotedFor');
    if (hasAlreadyVoted === 'wild') {
      openModalButton.classList.add('disabled');
      openModalButton.classList.add('chosen');
    } else if (hasAlreadyVoted) {
      openModalButton.classList.add('disabled');
    };

    let buttons = [ yesButton, cancelButton ];

    let options = {
      buttons: buttons,
      classes: 'wild'
    }

    if (window.innerWidth <= 700) {
      options.overlayClose = false;
    }


    var modalObj = nanoModal(document.getElementsByClassName('wild-card')[0],
                  options );

    openModalButton.addEventListener('click', function (event) {
      if (!hasAlreadyVoted) {
        modalObj.show();
      }
    });
  },

  validateForm: function (form) {

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
  },

  isAllValid: function (messages) {
    let hasAnyProps = true;
    for (var key in messages) {
      hasAnyProps = false;
      break;
    }

    return hasAnyProps;
  }

};

export default wildManager;
