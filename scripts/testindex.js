
//------------Объявление переменных---------------
// Переменная мод окна 
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");

//Находим форму редактирования в DOM

// Переменная кнопки редактировать Edit
const popupOpenEdit = document.querySelector(".profile__edit-button-icon");
// Кнопки закрыть Edit
//const popupCloseEdit = document.querySelector(".popup__close-edit");
// Переменная формы Edit
const formElementEdit = document.querySelector(".popup__form-edit"); 
// Профиля имя
const profileName = document.querySelector(".profile__name");
// Описания
const profileJob = document.querySelector(".profile__job");


// Переменная кнопки добавить Add
const popupOpenAdd = document.querySelector(".profile__add-button-icon");
// Переменная формы Add
const formElementAdd = document.querySelector(".popup__form-add"); 
// Кнопки закрыть форму добавить Add
//const popupCloseAdd = document.querySelector(".popup__close-add");

// Находим поля формы в DOM 
//Ввод имени и описания
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//Ввод названия и ссылки картинки
const titleInput = document.querySelector(".popup__input_type_title");
const imgInput = document.querySelector(".popup__input_type_upload");

//------------ЗАКРЫТИЕ------------

// Кнопка закрытия попап общая
const closePopupButtons = document.querySelectorAll('.popup__close');
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closePopupButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});
//-----------------------------------
//----------------------------------
//f открытия попап edit
function openPopupEdit() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
//f закрытия попап edit
function closePopup() {
  popup.classList.remove("popup_opened");
  }
//f редактирования формы edit
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
//f открытия попап add
function openPopup() {
  popupAdd.classList.add("popup_opened");
  titleInput.value = titleInput.textContent;
}
//f закрытия попап add
function closePopup() {
  popupAdd.classList.remove("popup_opened");
  }
// слушатели событий edit
popupOpenEdit.addEventListener('click', openPopup);
popupCloseEdit.addEventListener('click', closePopup);
formElementEdit.addEventListener('submit', handleFormSubmit);
// слушатели событий add
popupOpenAdd.addEventListener('click', openPopup);
popupCloseAdd.addEventListener('click', closePopup);
formElementAdd.addEventListener('submit', handleFormSubmit);


// Находим форму в DOM  let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM let nameInput = // Воспользуйтесь инструментом .querySelector() let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет function handleFormSubmit (evt) {    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    //Находим форму редактирования в DOM
