import messageManager from './messageManager';


let votingManager = {
    init: () => {

        // let buttons = document.getElementsByClassName('innov-icon');

        // let clickHandler = (event) => {
        //     console.log(event.currentTarget);
        //     console.log(event.target);
        //     console.log(event.currentTarget.dataset.name);
        // };

        // Array.prototype.forEach.call(buttons, (button, index) => {
        //     button.addEventListener('click', clickHandler);
        // });

    },

    submitVote: function (path) {
        return this.post(path).then(function(response) {
            // console.log("Success!", response);
            messageManager.showMessage(response);
        }, function(error) {
            console.error("Failed!", error);
        });
    },

    post: function (url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('POST', url);

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
};

export default votingManager;
