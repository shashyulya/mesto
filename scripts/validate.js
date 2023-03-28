const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  disabledButtonSave: "popup__save_disabled",
  inputErrorActive: "popup__input-error_active",
  errorClass: "popup__input-error",
};

// Отключаем отправку форм.
function disabledSubmit(e) {
  e.preventDefault();
}

// Функция, которая добавляет класс с ошибкой.
const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorActive);
  errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
  errorElement.classList.add(validationConfig.errorClass); // Замена содержимого span с ошибкой на переданный параметр
};

// Функция, которая удаляет класс с ошибкой.
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
  inputElement.classList.remove(validationConfig.inputErrorActive);
  errorElement.classList.add(validationConfig.errorClass); //
  errorElement.textContent = ""; //Скрываем сообщение об ошибке
};

// Функции, которые создают неактивную и активную кнопки отправки.
const disableSubmitButton = (validationConfig, buttonElement) => {
  buttonElement.classList.add(validationConfig.disabledButtonSave);
  buttonElement.disabled = true;
};

const activeSaveBtn = (validationConfig, buttonElement) => {
  buttonElement.classList.remove(validationConfig.disabledButtonSave);
  buttonElement.disabled = false;
};

// Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны
    return !inputElement.validity.valid; //Eсли поле не валидно, вернет true. Обход массива остановится и вся фкнуция вернет true
  });
};

// Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { //Если хотя бы один невалидный инпут, кнопка неактивна
    disableSubmitButton(validationConfig, buttonElement);
  } else {
    activeSaveBtn(validationConfig, buttonElement);
  }
};


//Функция проверки формы , деактивании кнопки и удаления текста ошибки
const resetFormCondition = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); // Ищем все инпуты
  const buttonElement = formElement.querySelector(validationConfig.saveButtonSelector); // Ищем кнопку
  toggleButtonState(validationConfig, inputList, buttonElement); //Включаем проверку опр статуса кнопки
  inputList.forEach(inputElement => { //Каждому инпуту включаем обработчик скрытия ошибки (ps инпуты при повторном открытии попап добавления картинки очищаются после сабмита)
    hideInputError(validationConfig, formElement, inputElement);
  });
};


// Функция, которая проверяет валидность поля. Принимает formElement и inputElement, не берет их из внешней области видимости.
// Функция isValid принимает сразу два параметра: formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме. И inputElement — проверяемое поле ввода.*
const isValid = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) { // Если поле не проходит валидацию, покажем ошибку передаем сообщение об ошибке вторым аргументом
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage); //ShowInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле.
  } else {
    hideInputError(validationConfig, formElement, inputElement); // Если поле прошло валидацию, скроем ошибку // hideInputError теперь получает параметром форму, в которой находится проверяемое полу, и само это поле.
  }
};

// Функция, которая добавляет обработчик для всех полей формы
const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector) //Находим все поля внутри формы, делаем из них массив через Array.from
  );
  const buttonElement = formElement.querySelector(validationConfig.saveButtonSelector); // Находим в текущей форме кнопку отправки
  toggleButtonState(validationConfig, inputList, buttonElement); //Вызываем toggleButtonState, чтобы не ждать ввода данных в поля

  inputList.forEach((inputElement) => { //Обходим все элементы массива, полученного выше
    inputElement.addEventListener("input", function () {//Каждому полю добавляем обработчик события input
      isValid(validationConfig, formElement, inputElement); //Внутри колбэка вызываем isVslid, передав форму и инпут
      toggleButtonState(validationConfig, inputList, buttonElement); //Вызываем toggleButtonState и передача ей массива полей и кнопки
    });
  });
};
 
// Функция, которая найдет, переберет все формы на странице и добавит всем формам обработчик
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); //Находим все формы с указанным классом в DOM, делаем из них массив через Array.from
  formList.forEach((formElement) => { //Перебираем полученный массив
    formElement.addEventListener("submit", disabledSubmit);
    setEventListeners(validationConfig, formElement); // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation(validationConfig);