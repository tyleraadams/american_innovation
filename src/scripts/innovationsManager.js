import _ from 'lodash';
import votingManager from './votingManager';
import nanoModal from 'nanomodal';

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
            let modalYesHandler = (modal) => {
              // console.log('!! ', modal);
              votingManager.submitVote(action);

              for (var i = 0; i < cogs.length; ++i) {
                cogs[i].classList.add('voted');
              }
              modal.hide();
            }
            let modalNoHandler = (modal) => {
              modal.hide();
            }
            // if (!event.currentTarget.classList.contains('disabled')) {
                // votingManager.submitVote(event.currentTarget.getAttribute('formaction'));

                var buttons = [{text: 'Yes', handler: modalYesHandler}, {text: 'Cancel', handler:modalNoHandler}]
                var justTextModal = nanoModal(`<h2>${name}</h2><img src=${src} alt=${name}><p>${description}</p><p>Would you like to vote for this innnovation?</p>`, {buttons: buttons});
                justTextModal.show();
                // event.currentTarget.classList.add('chosen');
                // cog.classList.add('voted');

                // let currentChild = event.currentTarget.parentNode.firstElementChild;
                // console.log(currentChild);
                // currentChild.classList.add('disabled');
                // while (currentChild.nextSibling) {
                //     currentChild = currentChild.nextSibling;
                //     currentChild.classList.add('disabled');
                // };
            // }
            // console.log(event.currentTarget);
            // console.log(event.target);
            // console.log(event.currentTarget.dataset.name);
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
        serverResponse = JSON.parse(serverResponse);
        alreadyVotedFlag = serverResponse[serverResponse.length - 1].hasOwnProperty('votedCookie');
        if (alreadyVotedFlag) {
            innovationVotedFor = serverResponse.pop().votedCookie;
            // console.log('this is supposed to be what the person voted for: ', serverResponse.pop())
        }
        console.log('serverResponse parsed: ', serverResponse);
        innovations = serverResponse;
        innovations.forEach(function(innovation, index) {
            if (innovation.hasOwnProperty('name')) {
                console.log('innovationVotedFor: ', innovationVotedFor);
                let button = document.createElement('button');
                let img = document.createElement('img');
                let span = document.createElement('span');
                img.src = innovation.thumb;
                img.alt = innovation.name;

                button.classList.add('innov');
                span.innerText = innovation.name;
                // button.setAttribute('method', 'POST');
                //
                if (alreadyVotedFlag) {
                    button.classList.add('disabled');
                    if (innovationVotedFor === innovation.name) {
                        button.classList.add('chosen');
                    }
                } else {
                    button.setAttribute('type', 'submit');
                    button.setAttribute('data-name', innovation.name);
                    button.setAttribute('data-description', innovation.description);
                    button.setAttribute('data-image', innovation.image);
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
    }

};

export default innovationsManager;
