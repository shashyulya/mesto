//Массив картинок
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//---------------------------------------------------------------------------------------------------------------//

//Template
const initialCardsList = document.querySelector(".elements"); // переменная ul
const initialCardsTemplate = document.querySelector("#grid-template").content; // переменная template

//---------------------------------------------------------------------------------------------------------------//

const popup = document.querySelector(".popup");

//---------------------------------------------------------------------------------------------------------------//

//переменные profile + popup edit
const popupOpenEdit = document.querySelector(".popup_edit"); // переиенная модалки edit
const popupCloseEdit = document.querySelector(".popup__close-edit");//переиенная модалки  Close buttone
const popupFormEdit = document.querySelector(".popup__form-edit"); // переменная формы edit
const nameInputEdit = document.querySelector(".popup__input_type_name"); // переменная выбор имя поля
const jobInputEdit = document.querySelector(".popup__input_type_job"); //переменная  выбор имя поля
const profileButtoneEdit = document.querySelector(".profile__edit-button-icon"); //переменная карандаша
const profileTitle = document.querySelector(".profile__title"); // переменная  профиля имя
const profileSubtitle = document.querySelector(".profile__subtitle"); // переменная   профиля описания

//---------------------------------------------------------------------------------------------------------------//

//переменные element  + popup add
const popupAdd = document.querySelector(".popup_add"); //переменные окна add
const popupCloseAdd = document.querySelector(".popup__close-add"); //переменная  х
const popupFormAdd = document.querySelector(".popup__form-add");  //переменная форма попап добавления картинок
const nameInputAdd = document.querySelector(".popup__input_type_title"); //переменная  поле текста 
const linkInputAdd = document.querySelector(".popup__input_type_upload"); //переменная поле ссылки картинки 
const profileButtoneAdd = document.querySelector(".profile__add-button-icon"); //переменная  +

//---------------------------------------------------------------------------------------------------------------//

переменные element  + popup Open image
const  popupFull = document.querySelector(".popup_open-img"); 
const  popupModalImg = document.querySelector(".popup__modal-img");
const  popupTextImg = document.querySelector(".popup__text-img");
const  popupContainerImg = document.querySelector(".popup__container-img");
const  popupCloseImg = document.querySelector(".popup__close-img");

//---------------------------------------------------------------------------------------------------------------//

//функция отображения карточек тимплейт 
function addCardTemplate(elementName, elementLink) {
  const initialCardsElement = initialCardsTemplate.querySelector(".element").cloneNode(true); // клонирование разметки
  const elementTitleTmplt = initialCardsElement.querySelector(".element__title"); // переменная разметки тимплейт  Н2
  const elementImageTmplt = initialCardsElement.querySelector(".element__image"); // переменная тимплейт img
  elementTitleTmplt.textContent = elementName;  //.textContent = element.name; // добавление в разметку текст
  elementImageTmplt.alt = elementName;  //.alt = element.link; // добавление в alt текста с Титла
  elementImageTmplt.src = elementLink; //.src = element.link; // добавление в разметку картинку

  initialCardsElement
    .querySelector(".element__like-button-icon")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("element__like-button-icon_active");
    }); //  лайк Актив

  initialCardsElement
    .querySelector(".element__delete-button-icon")
    .addEventListener("click", function (event) {
      event.target.closest(".element").remove();
    }); //удаление карточек

  elementImageTmplt.addEventListener("click", () => {
      popupFullImage( elementImageTmplt.src,  elementTitleTmplt.textContent);
    }); //вызов на клик - полномаштабная картинка 

  return initialCardsElement; //завершает выполнение текущей функции и возвращает её значение
  
};

// переборка массива методом  цикла forEach
initialCards.forEach((element) => {
  const initialCardsElement = addCardTemplate(element.name, element.link); // обьявляю переменную массива  которая равна  функции тимплейт с учеетом элементов массива
  addCard(initialCardsElement); // вызов функции добавления карточки в которую перемещается функция  тимплейт с cloneNode
});

//---------------------------------------------------------------------------------------------------------------//

//функция редактирования формы edit
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupOpenEdit);
}

//---------------------------------------------------------------------------------------------------------------//

// Вставляет узлы перед первым дочерним элементом узла add
function addCard(initialCardsElement) {
  initialCardsList.prepend(initialCardsElement);
}
// функция добавления карточек в разметку  add
function handleCardFormSubmitAdd(evt) {
  evt.preventDefault();
  const cardInputsAdd = addCardTemplate(nameInputAdd.value, linkInputAdd.value); // выбор полей попапОкнаКартинок по Бэм )
  addCard(cardInputsAdd); // вызов функции добавления карточек в начало массива с элементами массива
  closePopup(popupAdd); 
}

//---------------------------------------------------------------------------------------------------------------//

// функция открфтия полномаштабной картинки
function popupFullImage(elementLink ,elementName) {
  popupModalImg.src = elementLink;
  popupTextImg.textContent = elementName; 
  popupModalImg.alt = elementName ; 
  openPopup(popupFull);
  
}

//---------------------------------------------------------------------------------------------------------------//

//единые функции всех popap 
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//---------------------------------------------------------------------------------------------------------------//

// вызов  сохранение edit
popupFormEdit.addEventListener("submit", handleFormSubmit);
// вызов окна открытие , закрытие , добавление add
popupFormAdd.addEventListener("submit", handleCardFormSubmitAdd);

//---------------------------------------------------------------------------------------------------------------//

//функция открытия попап edit
profileButtoneEdit.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  openPopup(popupOpenEdit);
});

//функция открытия popup add
profileButtoneAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  popupFormAdd.reset();
});


//---------------------------------------------------------------------------------------------------------------//

//функция закрытия попап edit
popupCloseEdit.addEventListener("click", () => {
  closePopup(popupOpenEdit);
});

//функция закрытия.крестик popup add
popupCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

//функция закрытия.крестик popup img
popupCloseImg.addEventListener("click", () => {
  closePopup(popupFull);
});
//---------------------------------------------------------------------------------------------------------------//