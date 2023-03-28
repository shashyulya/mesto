import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { FormValidator } from "./FormValidator.js";

// Все попап
const popups = document.querySelectorAll('.popup');
const popupForm = document.querySelector('.popup__form');

// Попапы по id
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-open-image');

// Поля редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button-icon');
const formEdit = document.querySelector('#form-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const buttonEdit = document.querySelector('.popup__save-edit');
const buttonAdd = document.querySelector('.popup__save-add');

// Информация о пользователе
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Добавление новой карточки
const addButton = document.querySelector('.profile__add-button-icon');
const formAdd = document.querySelector('#form-add');
const cardTitle = document.querySelector('.popup__input_type_title');
const imageUpload = document.querySelector('.popup__input_type_upload');
const buttonSaveDisabled = document.querySelector('popup__save_disabled');
const elements = document.querySelector('.elements');

// Карточки темплэйт
const template = document.querySelector('#template');

// Переменные увеличение изображения
const popupImageZoom = document.querySelector('.popup__img');
const popupImageText = document.querySelector('.popup__text-img');

// f создания карточки
function createCard(cardElement) {
    return new Card(cardElement, '#template', openPopupImage).generateCard();
}

// 
function renderCard(cardElement) {
    elements.prepend(cardElement);
};

// включение и отключение кнопок
function toggleButtonOn(button) {
    button.classList.remove('popup__save_disabled');
    button.disabled = false;
}

function toggleButtonOff(button) {
    button.classList.add('popup__save_disabled');
    button.disabled = true;
}

// f открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escHandler);
}
function escHandler(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    };
};
//Закрытие попапов при нажатии на оверлэй
popups.forEach(item => {
    item.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(item);
        }
    });
});
// Закрытие попапов 
const closePopupButtons = document.querySelectorAll('.popup__close-button');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escHandler);
}

closePopupButtons.forEach((button) => {
    // находим ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

// Открытие попапа редактирования профиля
function openPopupEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
    toggleButtonOn(buttonEdit);
}

profileEdit.addEventListener('click', openPopupEdit);

// Обработчик «отправки» формы
function saveEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
}


// Прикрепляем обработчик к форме:
// следит за событием “submit” - отправка
formEdit.addEventListener('submit', saveEdit);

/*деактивировать кнопку "Создать"
formAdd.addEventListener('reset', buttonSaveDisabled);*/

/*
// Добавление элементов массива в карточки
const addElementCard = (cards) => {
    const newElementCard = template.content.cloneNode(true);
    // Добавили название
    const newTitle = newElementCard.querySelector('.element__title');
    // Добавили картинку
    const newImage = newElementCard.querySelector('.element__image');
    newTitle.textContent = cards.name;
    newImage.src = cards.link;
*/

function openPopupImage(name, link) {
    popupImageZoom.src = link;
    popupImageZoom.alt = name;
    popupImageText.textContent = name;
    openPopup(popupImage);
};
// f добавления новой карточки
function addNewCard (evt) {
    evt.preventDefault();
    const cards = { name: cardTitle.value, link: imageUpload.value };
    renderCard(createCard(cards));
    
    evt.target.reset();
    closePopup(popupAdd);
} 
formAdd.addEventListener('submit', addNewCard);

// Открытие попапа добавления картинки
function openPopupAdd(evt) {
    evt.preventDefault();
    openPopup(popupAdd);
    toggleButtonOff(buttonAdd);
}

addButton.addEventListener('click', openPopupAdd);
/*
const cleanValidationFields = (input) => {
    input.querySelectorAll(".popup__input-error")
    input.forEach((input) => input.classList.remove("popup__input-error"));
    input.querySelectorAll(".popup__input-error_active")
    input.forEach((input) => input.classList.remove("popup__input-error_active"));
};
*/
// Вставика элементов массива в карточку
initialCards.forEach((cardElement) => {
    renderCard(createCard(cardElement));
});

const validationEditForm = new FormValidator(validationConfig, popupEdit);
validationEditForm.enableValidation(validationConfig);

const validationAddForm = new FormValidator(validationConfig, popupAdd);
validationAddForm.enableValidation(validationConfig);