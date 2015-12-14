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

    clearMessages: function (container) {
      container.innerHTML = '';
    }


};

export default messageManager;
