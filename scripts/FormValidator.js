// Код FormValidator
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonElement: ".popup__save",
  disabledButtonSave: "popup__save_disabled",
  inputErrorActive: "popup__input-error_active",
  errorClass: "popup__input-error",
};

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationConfig.buttonElement); // бывший saveButtonSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
  }


  // Функция, которая добавляет класс с ошибкой.
  _showInputError = (inputElement, errorMessage) => {
    // находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorActive);
    errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
    errorElement.classList.add(this._validationConfig.errorClass); // Замена содержимого span с ошибкой на переданный параметр
  };

  // Функция, которая удаляет класс с ошибкой.
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
    inputElement.classList.remove(this._validationConfig.inputErrorActive);
    errorElement.classList.remove(this._validationConfig.errorClass); //
    errorElement.textContent = ''; //Скрываем сообщение об ошибке
  };

  // Функции, которые создают неактивную и активную кнопки отправки.
  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._validationConfig.disabledButtonSave);
    this._buttonElement.disabled = true;
  };

  _activateSubmitButton = () => {
    this._buttonElement.classList.remove(this._validationConfig.disabledButtonSave);
    this._buttonElement.disabled = false;
  };

  // Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => { //Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны
      return !inputElement.validity.valid; //Eсли поле не валидно, вернет true. Обход массива остановится и вся фкнуция вернет true
    });

  };

  // Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) { //Если хотя бы один невалидный инпут, кнопка неактивна
      this._disableSubmitButton();
    } else {
      this._activateSubmitButton();
    }
  };

  //Функция проверки формы , деактивании кнопки и удаления текста ошибки
  resetFormCondition = () => {
    this._toggleButtonState(); //Включаем проверку опр статуса кнопки
    this._inputList.forEach(inputElement => { //Каждому инпуту включаем обработчик скрытия ошибки (ps инпуты при повторном открытии попап добавления картинки очищаются после сабмита)
      this._hideInputError(inputElement);
    });
  };

  // Функция, которая проверяет валидность поля. Принимает formElement и inputElement, не берет их из внешней области видимости.
  // Функция isValid принимает сразу два параметра: formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме. И inputElement — проверяемое поле ввода.*
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) { // Если поле не проходит валидацию, покажем ошибку передаем сообщение об ошибке вторым аргументом
      this._showInputError(inputElement, inputElement.validationMessage); //ShowInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле.
    } else {
      this._hideInputError(inputElement); // Если поле прошло валидацию, скроем ошибку // hideInputError теперь получает параметром форму, в которой находится проверяемое полу, и само это поле.
    }
  };

  // Функция, которая добавляет обработчик для всех полей формы
  _setEventListeners = () => {
    this._toggleButtonState(); //Вызываем toggleButtonState, чтобы не ждать ввода данных в поля
    this._inputList.forEach((inputElement) => { //Обходим все элементы массива, полученного выше
      inputElement.addEventListener('input', () => {//Каждому полю добавляем обработчик события input
        this._isValid(inputElement); //Внутри колбэка вызываем isValid, передав форму и инпут
        this._toggleButtonState(); //Вызываем toggleButtonState и передача ей массива полей и кнопки
      });
    });
  };

  // Функция, которая найдет, переберет все формы на странице и добавит всем формам обработчик
  enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(this._validationConfig.formSelector)); //Находим все формы с указанным классом в DOM, делаем из них массив через Array.from
    formList.forEach((formElement) => { //Перебираем полученный массив
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(); // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
    });
  };
};