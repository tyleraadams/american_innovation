let messageManager = {
  init: function () {
    console.log('hellow !');
  },

  showMessage: function (message) {
      let messagesContainer = document.getElementsByClassName('messages')[0];
      this.clearMessages(messagesContainer);
      console.log(document.getElementsByClassName('messages'), document.getElementsByClassName('messages')[0]);
      let errorMessage = document.createElement('p');
      errorMessage.innerHTML = message;
      messagesContainer.appendChild(errorMessage);
  },


  showMessages: function (container, messages) {

    this.clearMessages(container);
    for (var message in messages) {
      let errorMessage = document.createElement('p');
      errorMessage.innerHTML = messages[message];
      container.appendChild(errorMessage);
    }
  },

  clearMessages: function (container) {
    container.innerHTML = '';
  }
};

export default messageManager;
