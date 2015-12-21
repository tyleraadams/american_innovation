import nanoModal from 'nanomodal';
let wildManager = {
  init: function () {
    console.log('hellow !');

    var modalObj = nanoModal(document.getElementsByClassName('wild-card')[0]);
    // modalObj.setContent(document.getElementsByClassName('wild-card')[0]);
    let nominateButton = document.getElementsByClassName('nominate')[0];
    nominateButton.addEventListener('click', function (event) {
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
