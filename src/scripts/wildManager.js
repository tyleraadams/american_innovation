import nanoModal from 'nanomodal';
import votingManager from './votingManager';
import innovationsManager from './innovationsManager';
import messageManager from './messageManager';
import validate from 'validate-js';
let wildManager = {
  init: function () {

    let openModalButton = document.getElementsByClassName('nominate')[0];
    console.log('!!!: ', JSON.parse(sessionStorage.getItem('currentRound')))
    let comeBackDate = JSON.parse(sessionStorage.getItem('currentRound'))['ending_date'];
    let yesButton  = {
      text: 'Submit',
      handler: function(modal) {
        // do something...
        votingManager.submitVote('/wild');
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
