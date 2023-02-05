let popup = document.querySelector(".popup"); // переиенная модалки
let popupOpen = document.querySelector(".profile__edit-button-icon"); //переменная карандаша
let popupClose = document.querySelector(".popup__close"); // переменная  кнопки закрыть
let profileName = document.querySelector(".profile__name"); // переменная  профиля имя
let profileDescription = document.querySelector(".profile__description"); // переменная   профиля описания
let formElement = document.querySelector(".popup__form"); // переменная формы
// let nameInput = formElement.elements.name; // переменная выбор имя поля (тоже правильно!!!)
// let jobInput = formElement.elements.description; //переменная  выбор имя поля (тоже правильно!!!)
let nameInput = document.querySelector(".popup__input_type_name");
let descriptionInput = document.querySelector(".popup__input_type_description");
//функция открытия попап
function openPopup() {
  popup.classList.add("popup_open");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
//функция закрытия попап
function closePopup() {
  popup.classList.remove("popup_open");
  formElement.reset();
}
//функция редактирования формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}
// открытие , закрытие , сохранение
popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);