//попапы
export const addCardFormPopup = document.querySelector('.popup_type_add-card');
export const editProfileFormPopup = document.querySelector('.popup_type_edit');
export const avatarFormPopup = document.querySelector('.popup_type_avatar')
export const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete')

//формы добавления карточки и редактирования профиля
export const addCardForm = document.querySelector('.form_type_add-card');
export const editProfileForm = document.querySelector('.form_type_edit');
export const avatarForm = document.querySelector('.form_type_avatar')

//кнопки открытия
export const openEditPopupBtn = document.querySelector('.profile__edit-button');
export const openAddCardPopupBtn = document.querySelector('.profile__add-button');
export const avatarImage = document.querySelector('.profile__image')

//инпуты формы редактирования
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');

export const initialCards = [
  {
    text: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    text: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    text: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    text: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    text: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    text: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//селекторы для валидации
export const config = {  
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',

}