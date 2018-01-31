'use strict';

var wizardNames = ['Лазарь', 'Авраам', 'Моисей', 'Иуда', 'Иосиф', 'Ной', 'Захария', 'Шалом'];
var wizardSurnames = [' Шмидт', ' Шнайдер', ' Фишер', ' Мюллер', ' Рихтер', ' Браун', ' Кох', ' Кёлер'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var generateRandomValue = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  var randomValue = arr[randomNumber];
  arr.splice(randomNumber, 1);
  return randomValue;
};

var assembleWizard = function () {
  var wizard = {
    name: generateRandomValue(wizardNames),
    surname: generateRandomValue(wizardSurnames),
    coatColor: generateRandomValue(coatColor),
    eyesColor: generateRandomValue(eyesColor),
  };
  return wizard;
};

var wizards = [];

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

var wizardQuantity = 4;
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizardQuantity; i++) {
  wizards[i] = assembleWizard();
  fragment.appendChild(renderWizard(wizards[i]));
}

document.querySelector('.setup-similar').classList.remove('hidden');
