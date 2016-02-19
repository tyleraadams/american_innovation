import nanoModal from 'nanomodal';
import votingManager from './votingManager';
import innovationsManager from './innovationsManager';
import utils from './utils';
// CANCEL BUTTONS ISN'T WORKING
const modalManager = {};

modalManager.modalYesButton = {
  text: 'Yes'
};

modalManager.modalNoButton = {
  text: 'Cancel'
  // handler: modalManager.modalNoHandler
};


modalManager.modalYesHandler = function (action, targetButton) {
  return function (modal) {
    targetButton.classList.add('chosen');
    votingManager.submitVote(action);
    utils.delayHide(modal);
    innovationsManager.disableButtons();
  };
};

modalManager.modalNoHandler = function (modal) {
  let hide = () => {
    modal.hide()
  }

  utils.delayHide(modal);
};

modalManager.buildButtons = function (isDisabled, action, targetButton) {
  if (isDisabled) {
    this.modalYesButton.classes = 'disabled';
  } else {
    this.modalYesButton.handler = this.modalYesHandler(action, targetButton);
  }

  this.modalNoButton.handler = this.modalNoHandler;

  return [this.modalYesButton, this.modalNoButton];
};

modalManager.buildInnovationModal = function (data, options) {
  let innovationModal;
  let markup = `<h2><span>${data.name}</span></h2>
    <img src=${data.src}
      width=${data.width}
      height=${data.height}
      alt=\"${data.name}\">
    <p>${data.description}</p>`;

  const callToAction = `<p>Would you like to vote for this innnovation?</p>`;
  if (data.audio !== 'undefined') {
    const iframe =   `<p><iframe frameborder="0"
        height="54"
        src="http://www.wnyc.org/widgets/ondemand_player/takeaway/#file=http://audio.wnyc.org/takeaway/takeaway012416-${data.audio}.mp3"
        width="474"></iframe>
      </p>`;
      markup += iframe;
  }
  markup += callToAction;
  innovationModal = nanoModal(markup, options);
  return innovationModal;
};

modalManager.innovClickHandler = function (event)  {
  event.preventDefault();
  let data = {};
  let targetButton = event.currentTarget;
  data.action = targetButton.getAttribute('formaction');
  data.name = targetButton.getAttribute('data-name');
  data.description = targetButton.getAttribute('data-description');
  data.src = targetButton.getAttribute('data-image');
  data.width = targetButton.getAttribute('data-image-width');
  data.height = targetButton.getAttribute('data-image-height');
  data.audio = targetButton.getAttribute('data-audio');
  data.isDisabled = targetButton.classList.contains('disabled');

  let options = { buttons: this.buildButtons(data.isDisabled, data.action, targetButton), autoRemove: true};


  if (window.innerWidth <= 700) {
    options.overlayClose = false;
  }

  this.buildInnovationModal(data, options).show();

};

export default modalManager;
