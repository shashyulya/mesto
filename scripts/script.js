//переменная кнопки эдит
let popupOpen = document.querySelector(".profile__edit-button-icon");
// переменная окна
let popup = document.querySelector(".popup");
// переменная кнопки закрыть
let popupClose = document.querySelector(".popup__close");
// переменная формы
let formElement = document.querySelector(".popup__form"); 
// переменная  профиля имя b jgbcfybz
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

//ввод имени и описания
let nameInput = document.querySelector(".popup__input_value_name");
let descriptionInput = document.querySelector(".popup__input_value_description");

//функция открытия попап
function openPopup() {
  popup.classList.add(".popup_opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
//функция закрытия попап
function closePopup() {
  popup.classList.remove(".popup_opened");
  formElement.reset();
}
//функция редактирования формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}
// слушатели событий 
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);