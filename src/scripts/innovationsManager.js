import _ from 'lodash';
import votingManager from './votingManager';
import wildManager from './wildManager';
import messageManager from './messageManager';

import moment from 'moment';
import utils from './utils';
import modalManager from './modalManager';


let innovationsManager = {
    init: function () {


        let that = this;
        let cogs = document.getElementsByClassName('cog');
        // need to handle this
  //         let currentChild = event.currentTarget.parentNode.firstElementChild;
  // currentChild.classList.add('disabled');
  // while (currentChild.nextSibling) {
  //     currentChild = currentChild.nextSibling;
  //     currentChild.classList.add('disabled');
  // };
        this.get('/innovations').then(function(response) {
          let innovations = response;
          let buttons = that.insertButtonsIntoDom(innovations).getElementsByClassName('innov');
          Array.prototype.forEach.call(buttons, (button, index) => {
            button.addEventListener('click', modalManager.innovClickHandler.bind(modalManager));
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
      if (alreadyVotedFlag) {
          innovationVotedFor = competitors.pop().votedCookie;
          sessionStorage.setItem('innovationVotedFor', innovationVotedFor);
          messageManager.showMessage(`You have already voted. Please check back ${comeBackDate}`);
      }
      wildManager.init();
      innovations = competitors;
      innovations.forEach(function(innovation, index) {
        if (innovation.hasOwnProperty('name')) {
            let button = document.createElement('button');
            let img = document.createElement('img');
            let span = document.createElement('span');
            img.src = innovation.image.thumb;
            img.alt = innovation.name;
            button.classList.add('innov');
            span.innerText = innovation.name;
            span.textContent = innovation.name;

            button.setAttribute('data-name', innovation.name);
            button.setAttribute('data-description', innovation.description);
            button.setAttribute('data-audio', innovation.audio);
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
       let frag = this.buildInnovations(innovations);
       let votingForm = document.getElementsByClassName('voting-form')[0];
       votingForm.appendChild(frag);
       // to be able to chain a search for the buttons
       return  votingForm;
    },

    disableButtons: function () {
      let buttons = document.querySelectorAll('.innov, .nominate');;
      Array.prototype.forEach.call(buttons, (button, index) => {
        button.classList.add('disabled');
      });
    }

};

export default innovationsManager;
