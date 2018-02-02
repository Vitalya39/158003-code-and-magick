'use strict';
var WIZARD_NAMES = ['Лазарь', 'Авраам', 'Моисей', 'Иуда', 'Иосиф', 'Ной', 'Захария', 'Шалом'];
var WIZARD_SURNAMES = [' Шмидт', ' Шнайдер', ' Фишер', ' Мюллер', ' Рихтер', ' Браун', ' Кох', ' Кёлер'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var getRandomValue = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  var randomValue = arr[randomNumber];
  arr.splice(randomNumber, 1);
  return randomValue;
};

var createWizardElements = function () {
  var wizard = {
    name: getRandomValue(WIZARD_NAMES),
    surname: getRandomValue(WIZARD_SURNAMES),
    coatColor: getRandomValue(COAT_COLOR),
    eyesColor: getRandomValue(EYES_COLOR),
  };
  return wizard;
};

var createWizards = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards[i] = createWizardElements();
  }
  return wizards;
};

createWizards(WIZARD_QUANTITY);

document.querySelector('.setup').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  similarListElement.appendChild(wizardElement);
  return wizardElement;
};

var fragment = document.createDocumentFragment();

var renderWizards = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
};

renderWizards(WIZARD_QUANTITY);

document.querySelector('.setup-similar').classList.remove('hidden');
