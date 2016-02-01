let messageManager = {
  init: function () {
  },

  showMessage: function (message) {
      let messagesContainer = document.getElementsByClassName('messages')[0];
      this.clearMessages(messagesContainer);
      let errorMessage = document.createElement('p');
      errorMessage.innerHTML = message;
      errorMessage.textContent = message;
      messagesContainer.appendChild(errorMessage);
  },


  showMessages: function (container, messages) {

    this.clearMessages(container);
    for (var message in messages) {
      let errorMessage = document.createElement('p');
      errorMessage.innerHTML = messages[message];
      errorMessage.textContent = messages[message];
      container.appendChild(errorMessage);
    }
  },

  clearMessages: function (container) {
    container.innerHTML = '';
  }
};

export default messageManager;
