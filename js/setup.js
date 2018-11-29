'use strict';

var WIZARDS_NUMBER = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
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

var itemSelection = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createName = function () {
  return itemSelection(names) + ' ' + itemSelection(surnames);
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillingBlock = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }

  return fragment;
};

for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards[i] = {
    name: createName(),
    coatColor: itemSelection(coatColors),
    eyesColor: itemSelection(eyesColors)
  };
}

similarListElement.appendChild(fillingBlock(wizards));
setup.querySelector('.setup-similar').classList.remove('hidden');

wizardCoat.addEventListener('click', function () {

  var newCoatColors = itemSelection(coatColors);
  var setupCoatColor = document.getElementsByName('coat-color');

  wizardCoat.style.fill = newCoatColors;
  setupCoatColor.value = newCoatColors;
});

wizardEyes.addEventListener('click', function () {

  var newEyesColors = itemSelection(eyesColors);
  var setupEyesColor = document.getElementsByName('eyes-color');

  // console.log('Обработчик клика на глазах');
  wizardEyes.style.fill = newEyesColors;
  setupEyesColor.value = newEyesColors;
  // console.log(newEyesColors);
  // console.log(setupEyesColor.value);
});

fireball.addEventListener('click', function () {

  var newFireballColors = itemSelection(fireballColors);
  var setupFireballColor = document.getElementsByName('fireball-color');

  fireball.style.backgroundColor = newFireballColors;
  setupFireballColor.value = newFireballColors;
});
