import nanoModal from 'nanomodal';
let wildManager = {
  init: function () {
    // debugger;
    let openModalButton = document.getElementsByClassName('nominate')[0];
    let yesButton  = {
      text: 'Submit',
      handler: function(modal) {
        // do something...
        alert("doing something...");
        modal.hide();
      }
    }
    var modalObj = nanoModal(document.getElementsByClassName('wild-card')[0],
      { buttons: [  yesButton ]});
       // modalObj.setContent(document.getElementsByClassName('wild-card')[0]);
    openModalButton.addEventListener('click', function (event) {
      modalObj.show();
    });
  },

  showMessage: function (message) {
    let messagesContainer = document.getElementsByClassName('messages')[0];
    this.clearMessages(messagesContainer);
    console.log(document.getElementsByClassName('messages'), document.getElementsByClassName('messages')[0]);
    let errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    messagesContainer.appendChild(errorMessage);
  },

  clearMessages: function (container) {
    container.innerHTML = '';
  }
};

export default wildManager;
