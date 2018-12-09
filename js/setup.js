'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizards = [];

  var setup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var setupFireballColor = fireball.querySelector('input');
  var setupCoatColor = document.querySelector('[name="coat-color"]');
  var setupEyesColor = document.querySelector('[name="eyes-color"]');

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

    var newCoatColor = itemSelection(coatColors);

    wizardCoat.style.fill = newCoatColor;
    setupCoatColor.value = newCoatColor;
  });

  wizardEyes.addEventListener('click', function () {

    var newEyesColor = itemSelection(eyesColors);

    wizardEyes.style.fill = newEyesColor;
    setupEyesColor.value = newEyesColor;
  });

  fireball.addEventListener('click', function () {

    var newFireballColors = itemSelection(fireballColors);

    fireball.style.backgroundColor = newFireballColors;
    setupFireballColor.value = newFireballColors;
  });
})();
