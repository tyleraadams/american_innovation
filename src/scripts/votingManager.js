import messageManager from './messageManager';
import $ from 'jquery';

let votingManager = {

    submitVote: function (path) {
        // return this.post(path).then(function(response) {
        //     console.log("Success!", path);
        //     messageManager.showMessage(response);

        // }, function(error) {
        //     console.error("Failed!", error);
        // });

        return $.post(path, function (result) {
          messageManager.showMessage(result);
        });
    },

    post: function (url, formData) {
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
        if (formData) {
          // debugger
          // formData = new FormData(formData);
          req.setRequestHeader("Content-Type","application/json;charset=utf-8");
          req.send(formData);
        } else {

          // Make the request
          req.send();
        }
      });
    },

    submitNomination: function (path, formData) {
      // debugger
    // return this.post(path, formData).then(function(response) {
    //     // debugger
    //         console.log("Success!", path);
    //         messageManager.showMessage(response);

    //     }, function(error) {
    //         console.error("Failed!", error);
    //     });
    // }

      return $.post(path, formData, function(result){
        messageManager.showMessage(result);
      }, 'json');
    }
};

export default votingManager;
