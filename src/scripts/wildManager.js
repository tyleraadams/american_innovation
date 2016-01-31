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
};

wildManager.modalYesHandler = function(openModalButton, comeBackDate) {
  return function (modal) {
    let formDom = modal.getContent();

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

    let validationMessages = utils.validateForm(formData);
    let isAllValid = utils.isAllValid(validationMessages);
    if (isAllValid) {
        // formData = JSON.stringify(formData);
        votingManager.submitNomination('/wild', formData);
        sessionStorage.setItem('innovationVotedFor', 'nomination');
        // hasAlreadyVoted = true;
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
};

wildManager.modalNoHandler = function(modal) {
    let hide = () => {
        modal.hide()
    }

    utils.delayHide(modal);
};


wildManager.buildButtons = function(openModalButton, comeBackDate) {

    this.modalYesButton.handler = this.modalYesHandler(openModalButton, comeBackDate);

    this.modalNoButton.handler = this.modalNoHandler;

    return [this.modalYesButton, this.modalNoButton];
};

wildManager.init = function() {

    let openModalButton = document.getElementsByClassName('nominate')[0];
    let comeBackDate = moment(JSON.parse(sessionStorage.getItem('currentRound'))['ending_date']).add('days', 1).format('MMMM D');



    let hasAlreadyVoted = sessionStorage.getItem('innovationVotedFor');
    if (hasAlreadyVoted === 'wild') {
        openModalButton.classList.add('disabled');
        openModalButton.classList.add('chosen');
    } else if (hasAlreadyVoted) {
        openModalButton.classList.add('disabled');
    };

    let buttons = this.buildButtons(openModalButton, comeBackDate);

    let options = {
        buttons: buttons,
        classes: 'wild'
    }

    if (window.innerWidth <= 700) {
        options.overlayClose = false;
    }


    let wildCardModalObj = nanoModal(document.getElementsByClassName('wild-card')[0],
        options);

    openModalButton.addEventListener('click', function(event) {
        if (!hasAlreadyVoted) {
            wildCardModalObj.show();
        }
    });
};


export default wildManager;
