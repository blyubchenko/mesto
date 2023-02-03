const object = {
formSelector: '.popup__form',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__button-save',
inactiveButtonClass: 'popup__button-save_inactive',
inputErrorClass: 'popup__input_type_error',
errorClass: 'popup__input-error_active'};

//функция проверки есть ли невалидные поля в форме
function hasInvalidInput (inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

//функция валидации кнопки
function toggleButtonSave (inputs, button, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  };
};

//функция поиска errorElement
function screnErrorElement (input) {
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  return errorElement;
};

//функция показывающая сообщение о ошибке
function showInputError (input, inputErrorClass, errorClass, errorElement) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
};

//функция скрывающая сообщение о ошибке
function hideInputError (input, inputErrorClass, errorClass, errorElement) {
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//функция проверки валидности
function checkValidation (input, inputErrorClass, errorClass) {
  const errorElement = screnErrorElement(input);
   if (!input.validity.valid) {
     showInputError (input, inputErrorClass, errorClass, errorElement);
   } else {
     hideInputError (input, inputErrorClass, errorClass, errorElement);
   };
 };
 
//добавляем слушатели событий input
function setEventListenerInput (inputs, button, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) {
  toggleButtonSave (inputs, button, inactiveButtonClass);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkValidation (input, inputErrorClass, errorClass);
      toggleButtonSave (inputs, button, inactiveButtonClass);
    });
  });
};

//функция включения валидации формы
function enableValidation ({formSelector, inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);
   form.addEventListener('submit', evt => {
    evt.preventDefault();
    toggleButtonSave (inputs, button, inactiveButtonClass);
  });
  setEventListenerInput(inputs, button, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass);
  });
};

enableValidation(object);