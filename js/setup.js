'use strict';
var WIZARD_QUANTITY = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardNames = ['Лазарь', 'Авраам', 'Моисей', 'Иуда', 'Иосиф', 'Ной', 'Захария', 'Шалом'];
var wizardSurnames = [' Шмидт', ' Шнайдер', ' Фишер', ' Мюллер', ' Рихтер', ' Браун', ' Кох', ' Кёлер'];


var getRandomValue = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  var randomValue = arr[randomNumber];
  arr.splice(randomNumber, 1);
  return randomValue;
};

var createWizards = function (quantity) {
  var coatColor = COAT_COLOR.slice();
  var eyesColor = EYES_COLOR.slice();
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards[i] = {
      name: getRandomValue(wizardNames),
      surname: getRandomValue(wizardSurnames),
      coatColor: getRandomValue(coatColor),
      eyesColor: getRandomValue(eyesColor),
    };
  }
  return wizards;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var renderWizards = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createWizardElement(array[i]));
  }
  return fragment;
};

var wizards = createWizards(WIZARD_QUANTITY);
similarListElement.appendChild(renderWizards(wizards));

document.querySelector('.setup-similar').classList.remove('hidden');

// 1. ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА НАСТРОЙКИ
var setup = document.querySelector('.setup'); // окно
var setupOpen = document.querySelector('.setup-open'); // откроет окно кнопка
var setupClose = setup.querySelector('.setup-close'); // закроет окно кнопка

// функция открытия окна
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// функция закрытия окна
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// 1.1 кликаем по элементу setupOpen и окно открывается
setupOpen.addEventListener('click', function () {
  openPopup();
});

// 1.2 кликаем по элементу  setupClose и окно закрывается
setupClose.addEventListener('click', function () {
  closePopup();
});

// 1.3 когда иконка в фокусе , по нажатию enter откроется окно setup
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// 1.4 закрыть окно при нажатии ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// если фокус на форме ввода, esc не закроет окно
var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});


// 1.5 при фокусе на крестике окно закроется по нажатию Enter
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// 2 Валидация ввдоа имени персонажа
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// для следующих пунктов напишем функцию, которая дает случайный элемент массива
// var getRandomItemFromArray = function (array) {
//   var randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// };

// или используем функцию которая выдает следующий элемент массива
var getNexItemFromArray = function (array) {
  var color = array.splice(0, 1)[0];
  array.push(color);
  return color;
};

// 3. Изменение цвета мантии по нажатию
var coat = setup.querySelector('.setup-wizard .wizard-coat');

coat.addEventListener('click', function () {
  coat.style.fill = getNexItemFromArray(COAT_COLOR);
});


// 4. Изменение цвета глаз по нажатию
var eyes = setup.querySelector('.setup-wizard .wizard-eyes');

eyes.addEventListener('click', function () {
  eyes.style.fill = getNexItemFromArray(EYES_COLOR);
});


// 5. Изменение цвета фаербола.
var fireball = setup.querySelector('.setup-fireball-wrap');

fireball.addEventListener('click', function () {
  fireball.style.background = getNexItemFromArray(FIREBALL_COLORS);
});
