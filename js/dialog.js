'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupInitTop;
  var setupInitLeft;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setupInitTop = setup.offsetTop;
    setupInitLeft = setup.offsetLeft;
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = setupInitTop + 'px';
    setup.style.left = setupInitLeft + 'px';
    setup.top = setupInitTop;
    setup.left = setupInitLeft;
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
