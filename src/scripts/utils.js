const utils = {};

utils.timeoutDelay = 200;

utils.delayHide = function (hideableItem)  {
  const hide = () => {
    hideableItem.hide()
  }
  setTimeout(hide, this.timeoutDelay);
};

export default utils;
