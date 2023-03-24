// Файл с кодом класса Card

class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._openPopupImage = openPopupImage;
    this._templateSelector = templateSelector;
  }

  // добавляем метод _getTemplate
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      // найдёт template-элемент (используем селектор, который передаем из index.js при создании карточки. 
      //Конструктор становится универсальным для разных template-элементов)
      .content.querySelector(".element") // извлечет его содержимое и в содержимом найдёт элемент с классом element
      .cloneNode(true); // клонирует его

    return cardElement; // вернёт клонированный элемент
  }

  // добавляем классу метод, который вставит данные в разметку и подготовит карточку к публикации 
  generateCard() {
    this._element = this._getTemplate(); // запишем в разметку приватное поле у др.элементов появится доступ к ней

    // добавим данные
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLike = this._element.querySelector(".element__like-button-icon");
    this._elementDelete = this._element.querySelector(".element__delete-button-icon");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element; // вернем наружу
  }

  // лайк карточки
  _like() {
    this._elementLike.classList.toggle("element__like-button-icon_active");
  }

  // удаление карточки 
  _delete() {
    this._element.remove();
    this._element = null;
  }

  // метод добавления всех обработчиков в одном месте
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._openPopupImage(this._name, this._link);
    });

    this._elementLike.addEventListener("click", () => this._like());
    this._elementDelete.addEventListener("click", () => this._delete());
  }
}

export { Card };
