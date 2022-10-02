const prods = [];

class Product {
  constructor(name, rate, capitaliz) {
    this.name = name;
    this.rate = rate;
    this.capitaliz = capitaliz; //кол-во капитализаций в году
  }
}

function getProduct() {
  if (!validateNameProd(document.querySelector('#name').value)) {
    prods.push(new Product (
      document.querySelector('#name').value,
      document.querySelector('#rate').value,
      document.querySelector('#capitaliz').value,
    ));
    cloneForm();
  }
}

function validateNameProd(name) {
  let isName = false;
  prods.forEach((el) => {
    if (el.name === name) {
      isName = true;
      alert('This name already exists!');
    }
  })
  return isName;
}

let formId;

function cloneForm() {
  formId = prods[prods.length - 1].name;
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.className = `${formId}`;
  span.innerHTML = `${formId}`;
  document.body.appendChild(div);
  div.appendChild(span);
  
  document.querySelector(`span.${formId}`).addEventListener('click', function() {
    const form = document.querySelector('.user__calc');
    const clonedForm = form.cloneNode(true);
    div.appendChild(clonedForm);
    clonedForm.removeAttribute('hidden');
    clonedForm.className = span.className;
    formId = clonedForm.className;

    document.querySelector(`.${formId} .calc`).addEventListener('click', calculate);
  }, { once: true });
}

function getValues() {
  return [
    document.querySelector(`.${formId} .sum`).value,
    document.querySelector(`.${formId} .period`).value,
  ];
};

function calculate() {
  const values = getValues();

  prods.forEach((el, i, arr) => {
    let obj = Object.values(prods[i]);
    obj.forEach((el, i, arr) => {
      if (formId === obj[i]) {
        const calc = (values[0] * ((1 + obj[i + 1] / 100) / (12 / obj[i + 2])) ** (values[1] / obj[i + 2])).toFixed(2);
        // console.log (`${obj[i]} ${calc}`);
        getResult(calc);
      }
    })
  })
}

function getResult(value) {
  document.querySelector(`.${formId} .result`).innerHTML = String(value);
}

document.querySelector('#submit').addEventListener('click', getProduct);

// localStorage
const firstDeposit = {
  name: 'Cool',
  rate: 10,
  capitaliz: 4,
}

localStorage.setItem('deposit1', JSON.stringify(firstDeposit));
const deposit1 = localStorage.getItem('deposit1');
JSON.parse(deposit1);

prods.push(firstDeposit);
cloneForm();