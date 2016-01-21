import _ from 'lodash';
import votingManager from './votingManager';
import wildManager from './wildManager';
import messageManager from './messageManager';
import nanoModal from 'nanomodal';
import moment from 'moment';
let innovationsManager = {
    init: function () {


        let that = this;
        let cogs = document.getElementsByClassName('cog');
        let clickHandler = (event) => {
          event.preventDefault();
          let targetButton = event.currentTarget;
          let action = targetButton.getAttribute('formaction');
          let name = targetButton.getAttribute('data-name');
          let description = targetButton.getAttribute('data-description');
          let src = targetButton.getAttribute('data-image');
          let width = targetButton.getAttribute('data-image-width');
          let height = targetButton.getAttribute('data-image-height');
          let isDisabled = targetButton.classList.contains('disabled');
          let modalYesHandler = (modal) => {
            // console.log('!! ', modal);
            votingManager.submitVote(action);
            targetButton.classList.add('chosen');
            for (var i = 0; i < cogs.length; ++i) {
              cogs[i].classList.add('voted');
            }
            modal.hide();
          }
          let modalNoHandler = (modal) => {
            setTimeout( modal.hide(), 500);

          }

          let modalYesButton = {text: 'Yes'};
          // let modalYesButton = Object.assign({}, yesButton);


          if (isDisabled) {
            modalYesButton.classes = 'disabled';
          } else {
            modalYesButton.handler = modalYesHandler;
          }
            // if (!event.currentTarget.classList.contains('disabled')) {
                // votingManager.submitVote(event.currentTarget.getAttribute('formaction'));
          let buttons = [modalYesButton, {text: 'Cancel', handler:modalNoHandler}];

          let options = {
            buttons: buttons
          }

          if (window.innerWidth <= 700) {
            options.overlayClose = false;
          }

          let justTextModal = nanoModal(`<h2><span>${name}</span></h2><img src=${src} width=${width} height=${height} alt=\"${name}\"><p>${description}</p><p>Would you like to vote for this innnovation?</p>`, options);
          justTextModal.show();


          let currentChild = event.currentTarget.parentNode.firstElementChild;
          currentChild.classList.add('disabled');
          while (currentChild.nextSibling) {
              currentChild = currentChild.nextSibling;
              currentChild.classList.add('disabled');
          };

        };


        this.get('/innovations').then(function(response) {
          // console.log('hello, !this!! is yo@ur! response: ', response);
            let innovations = response;
            let buttons = that.insertButtonsIntoDom(innovations).getElementsByClassName('innov');
              // console.log('hello, !this!! is yo@ur! buttons: ', buttons);
             // = document.getElementsByClassName('innov');
            // console.log(buttons.querySelectorAll('button'));
            Array.prototype.forEach.call(buttons, (button, index) => {

                button.addEventListener('click', clickHandler);
            });

            }, function(error) {
                console.error("Failed!", error);
        });
    },
    // http://www.html5rocks.com/en/tutorials/es6/promises/
    get: function (url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    },
    // expecitng an array of objects back from the server [{name: 'Cell Phone'}]
    buildInnovations: function (serverResponse) {
        let frag = document.createDocumentFragment();
        let alreadyVotedFlag;

        let innovations;
        let innovationVotedFor;
        let currentRound = serverResponse;
        serverResponse = JSON.parse(serverResponse);
        let comeBackDate =  moment(JSON.parse(currentRound)['ending_date']).add('days', 1).format('MMMM D');
        let competitors = serverResponse.competitors;
        // console.log(currentRound);
        alreadyVotedFlag = competitors[competitors.length - 1].hasOwnProperty('votedCookie');
         sessionStorage.setItem('currentRound', currentRound);
         wildManager.init();
        if (alreadyVotedFlag) {
            innovationVotedFor = competitors.pop().votedCookie;
            sessionStorage.setItem('innovationVotedFor', innovationVotedFor);

            messageManager.showMessage(`You have already voted. Please check back ${comeBackDate}`)
            // console.log('this is supposed to be what the person voted for: ', competitors.pop())
        }
        // console.log('competitors parsed: ', competitors);
        innovations = competitors;
        innovations.forEach(function(innovation, index) {
            if (innovation.hasOwnProperty('name')) {
                console.log('innovationVotedFor: ', innovationVotedFor);
                let button = document.createElement('button');
                let img = document.createElement('img');
                let span = document.createElement('span');
                img.src = innovation.image.thumb;
                img.alt = innovation.name;

                button.classList.add('innov');
                span.innerText = innovation.name;
                // button.setAttribute('method', 'POST');
                //
                button.setAttribute('data-name', innovation.name);
                button.setAttribute('data-description', innovation.description);
                button.setAttribute('data-image', innovation.image.src);
                button.setAttribute('data-image-width', innovation.image.width);
                button.setAttribute('data-image-height', innovation.image.height);
                if (alreadyVotedFlag) {
                    button.classList.add('disabled');

                    if (innovationVotedFor === innovation.name) {
                      button.classList.add('chosen');
                    }
                } else {
                    button.setAttribute('type', 'submit');

                    button.setAttribute('formaction', `/innovations/${innovation.name.replace(/\s/g, '-')}`);
                }
                button.appendChild(span);
                button.appendChild(img);
                frag.appendChild(button);
            }

        });


        return frag;
    },

    insertButtonsIntoDom: function (innovations) {
      console.log('these are the innovations inside insertbuttonsintodom: ', innovations);
       let frag = this.buildInnovations(innovations);
       let votingForm = document.getElementsByClassName('voting-form')[0];
       votingForm.appendChild(frag);
       // to be able to chain a search for the buttons
       return  votingForm;
    },

    disableButtons: function () {
      let buttons = document.getElementsByClassName('innov');
      Array.prototype.forEach.call(buttons, (button, index) => {
        button.classList.add('disabled');
      });
    },

    applyChosenClass: function () {

    }

};

export default innovationsManager;
