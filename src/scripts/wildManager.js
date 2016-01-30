import nanoModal from 'nanomodal';
import votingManager from './votingManager';
import innovationsManager from './innovationsManager';
import messageManager from './messageManager';
import validate from 'validate-js';
import moment from 'moment';
import utils from './utils';

const wildManager = {};

wildManager.modalYesButton = {
  text: 'Submit'
};
wildManager.modalNoButton = {
  text: 'Cancel'
  // handler: modalManager.modalNoHandler
};

wildManager.modalYesHandler = function (modal) {
    let formDom = modal.getContent();

        // let form = parentEl.querySelector('form');
        let name = formDom.querySelector('[name=name]').value;
        let phone = formDom.querySelector('[name=phone]').value;
        let innovation = formDom.querySelector('[name=innovation]').value;
        let description = formDom.querySelector('[name=description]').value;
        let email = formDom.querySelector('[name=email]').value;

        let formData = {
          "name": name,
          "phone": phone,
          "innovation": innovation,
          "description": description,
          "email": email
        };

        let validationMessages = this.validateForm(formData);
        let isAllValid = this.isAllValid(validationMessages);
        if (isAllValid) {
          formData = JSON.stringify(formData);
          votingManager.submitNomination('/wild', formData);
          sessionStorage.setItem('innovationVotedFor', 'nomination');
          hasAlreadyVoted = true;
          innovationsManager.disableButtons();
          utils.delayHide(modal);
          messageManager.showMessage(`Thank you for submiting a nomination. Please check back ${comeBackDate} to see if we chose your submission.`);
          openModalButton.classList.add('disabled');
          openModalButton.classList.add('chosen');
        } else {
          let container = formDom.getElementsByClassName('wild-messages')[0];
          messageManager.showMessages(container, validationMessages);
        }

};

wildManager.modalNoHandler = function (modal) {
  let hide = () => {
    modal.hide()
  }

  utils.delayHide(modal);
};


wildManager.validateForm = function (form) {

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

  wildManager.isAllValid = function (messages) {
    let hasAnyProps = true;
    for (var key in messages) {
      hasAnyProps = false;
      break;
    }

    return hasAnyProps;
  };
  wildManager.buildButtons = function () {
  // console.log( 'this inside ofbuild buttosn');

  // if (isDisabled) {
  //   this.modalYesButton.classes = 'disabled';
  // } else {
    this.modalYesButton.handler = this.modalYesHandler.bind(this);
  // }

  this.modalNoButton.handler = this.modalNoHandler;

  return [this.modalYesButton, this.modalNoButton];
};
  wildManager.init = function () {

    let openModalButton = document.getElementsByClassName('nominate')[0];
    let comeBackDate = moment(JSON.parse(sessionStorage.getItem('currentRound'))['ending_date']).add('days', 1).format('MMMM D');



    let hasAlreadyVoted = sessionStorage.getItem('innovationVotedFor');
    if (hasAlreadyVoted === 'wild') {
      openModalButton.classList.add('disabled');
      openModalButton.classList.add('chosen');
    } else if (hasAlreadyVoted) {
      openModalButton.classList.add('disabled');
    };

    let buttons = this.buildButtons();

    let options = {
      buttons: buttons,
      classes: 'wild'
    }

    if (window.innerWidth <= 700) {
      options.overlayClose = false;
    }


    let wildCardModalObj = nanoModal(document.getElementsByClassName('wild-card')[0],
                  options );

    openModalButton.addEventListener('click', function (event) {
      if (!hasAlreadyVoted) {
        wildCardModalObj.show();
      }
    });
  };



export default wildManager;
