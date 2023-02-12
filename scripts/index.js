//Находим форму в DOM
// Переменная кнопки
let popupOpen = document.querySelector(".profile__edit-button-icon");
// Окна
let popup = document.querySelector(".popup");
// Кнопки закрыть
let popupClose = document.querySelector(".popup__close-button");
// Формы
let formElement = document.querySelector(".popup__form"); 
// Профиля имя
let profileName = document.querySelector(".profile__name");
// Описания
let profileJob = document.querySelector(".profile__job");

// Находим поля формы в DOM 
//Ввод имени и описания
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

//f открытия попап
function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
//f закрытия попап
function closePopup() {
  popup.classList.remove("popup_opened");
  }
//f редактирования формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
// слушатели событий 
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


// Находим форму в DOM  let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM let nameInput = // Воспользуйтесь инструментом .querySelector() let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет function handleFormSubmit (evt) {    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent