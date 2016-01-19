import nanoModal from 'nanomodal';
import votingManager from './votingManager';
import innovationsManager from './innovationsManager';
import messageManager from './messageManager';
import validate from 'validate-js';
import moment from 'moment';
let wildManager = {
  init: function () {

    let openModalButton = document.getElementsByClassName('nominate')[0];
    // console.log('!!!: ', JSON.parse(sessionStorage.getItem('currentRound')))
    let comeBackDate = moment(JSON.parse(sessionStorage.getItem('currentRound'))['ending_date']).add('days', 1).format('MMMM D');

    let yesButton  = {
      text: 'Submit',
      handler: function(modal) {

        let form = event.target.parentElement.parentElement.querySelector('form');
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
        }
        form = JSON.stringify(form);
// <form name=​"wild-card" class=​"wild-card" method=​"POST" action=​"/​wild">​…​</form>​

        votingManager.submitNomination('/wild', form);
        // form.submit();
        sessionStorage.setItem('innovationVotedFor', 'nomination');
        hasAlreadyVoted = true;
        innovationsManager.disableButtons();
        modal.hide();
        messageManager.showMessage(`Thank you for submiting a nomination. Please check back ${comeBackDate} to see if we chose your submission.`);
      }
    };

    let cancelButton  = {
      text: 'Cancel',
      handler: function(modal) {
        modal.hide();
      }
    };

    let hasAlreadyVoted = sessionStorage.getItem('innovationVotedFor');
    if (hasAlreadyVoted) {
      openModalButton.classList.add('disabled');
    }
    var modalObj = nanoModal(document.getElementsByClassName('wild-card')[0],
                  { buttons: [  yesButton, cancelButton ], classes: 'wild'});

    openModalButton.addEventListener('click', function (event) {
      if (!hasAlreadyVoted) {
        modalObj.show();
      }
    //   var validator = new FormValidator('wild-card', [{
    //   name: 'name',
    //   display: 'required',
    //   rules: 'required|alpha'
    // }, {
    //     name: 'email',
    //     rules: 'required|valid_email'
    // }, {
    //     name: 'phone',
    //     rules: 'required|exact_length(10)|numeric'
    // }, {
    //     name: 'innov',
    //     display: 'password confirmation',
    //     rules: 'required|alpha_numeric'
    // }, {
    //     name: 'description',
    //     rules: 'required|alpha_numeric'
    // }], function(errors, event) {
    //     if (errors.length > 0) {
    //       console.log(errors);
    //         // Show the errors
    //     }
    });
  }

};

export default wildManager;
