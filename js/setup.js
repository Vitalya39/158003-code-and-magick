'use strict';
var WIZARD_NAMES = ['Лазарь', 'Авраам', 'Моисей', 'Иуда', 'Иосиф', 'Ной', 'Захария', 'Шалом'];
var WIZARD_SURNAMES = [' Шмидт', ' Шнайдер', ' Фишер', ' Мюллер', ' Рихтер', ' Браун', ' Кох', ' Кёлер'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var wizards = [];

var generateRandomArrNumber = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  var randomValue = arr[randomNumber];
  arr.splice(randomNumber, 1);
  return randomValue;
};


var createWizardElements = function () {
  var wizard = {
    name: generateRandomArrNumber(WIZARD_NAMES),
    surname: generateRandomArrNumber(WIZARD_SURNAMES),
    coatColor: generateRandomArrNumber(COAT_COLOR),
    eyesColor: generateRandomArrNumber(EYES_COLOR),
  };
  return wizard;
};


var createWizardsArr = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    wizards[i] = createWizardElements();
  }
  return wizards;
};

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

createWizardsArr(WIZARD_QUANTITY);

var fragment = document.createDocumentFragment();

var renderWizards = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
};

renderWizards(WIZARD_QUANTITY);

document.querySelector('.setup-similar').classList.remove('hidden');
