'use strict';

let formOK = 0;

const inputs = document.querySelectorAll('.inputField');

const checkAttribute = (elements, attr, func) => {
  elements.forEach( (element) => {

    if(element.hasAttribute(attr)) {
        func(element);
    }
  });
};

const checkEmpty = (element) => {
  if(element.value === '') {
    formOK++;
    element.setAttribute('style','border: red solid 2px');
  } else {
    formOK--;
    element.removeAttribute('style');
  }
};

const checkPattern = (element) => {
  const regex = new RegExp(element.getAttribute('pattern'), 'i'); //RegEx pattern of this element
  const value = element.value;

  if(!regex.test(value)) {
    element.setAttribute('style', 'border: yellow solid 2px');
    formOK++;
  } else {
    element.removeAttribute('style');
    formOK--;
  }

}

const form = document.querySelector('form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formOK = 0;

  checkAttribute(inputs, 'required', checkEmpty);
  checkAttribute(inputs, 'pattern', checkPattern);
  if(formOK === -5) {
    form.submit();
    console.log("submit");
  }
});
