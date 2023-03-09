// Все попап
const popups = document.querySelectorAll('.popup');

// Попапы по id
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-open-image');

// Поля редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button-icon');
const formEdit = document.querySelector('#form-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// Информация о пользователе
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Добавление новой карточки
const addButton = document.querySelector('.profile__add-button-icon');
const formAdd = document.querySelector('#form-add');
const cardTitle = document.querySelector('.popup__input_type_title');
const imageUpload = document.querySelector('.popup__input_type_upload');


// Карточки темплэйт
const elements = document.querySelector('.elements');
const template = document.querySelector('#template');

// Переменные увеличение изображения
const popupImageZoom = document.querySelector('.popup__img');
const popupImageText = document.querySelector('.popup__text-img');

// f открытия попапов
function openPopup(popups) {
    popups.classList.add('popup_opened');
}

// Закрытие попапов
const closePopupButtons = document.querySelectorAll('.popup__close-button');

function closePopup(popups) {
    popups.classList.remove('popup_opened');
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

// Массив карточек
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

// Добавление элементов массива в карточки
const addElementCard = (cards) => {
    const newElementCard = template.content.cloneNode(true);
    // Добавили название
    const newTitle = newElementCard.querySelector('.element__title');
    // Добавили картинку
    const newImage = newElementCard.querySelector('.element__image');
    newTitle.textContent = cards.name;
    newImage.src = cards.link;

    // Лайк карточке
    const cardLike = newElementCard.querySelector('.element__like-button-icon');
    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('element__like-button-icon_active');
    });
    // Удаление карточки
    const deleteCard = newElementCard.querySelector('.element__delete-button-icon');
    const cardButtonDelete = (evt) => {
        evt.target.closest('.element').remove();
    }

    deleteCard.addEventListener('click', cardButtonDelete);
    cardLike.addEventListener('click', cardLike);

    newImage.addEventListener('click', () => {
        popupImageZoom.src = cards.link;
        popupImageZoom.alt = cards.name;
        popupImageText.textContent = cards.name;
        openPopupImage();
    });

    return newElementCard;
};

// Добавление карточки
const renderElementCard = (wrap, cards) => {
    wrap.prepend(addElementCard(cards));
};

// Вставика элементов массива в карточку
initialCards.forEach((cards) => {
    renderElementCard(elements, cards);
});

formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cards = { name: cardTitle.value, link: imageUpload.value };

    renderElementCard(elements, cards);
    closePopup(popupAdd);
    evt.target.reset();
});

// Открываем попав увеличенной фотографии и добавляем картинку и название    
function openPopupImage() {
    openPopup(popupImage);
}

// Открытие попапа добавления картинки
function openPopupAdd(evt) {
    evt.preventDefault();
    openPopup(popupAdd);
}

addButton.addEventListener('click', openPopupAdd);