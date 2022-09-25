const prods = [];

class Product {
  constructor(name, rate, capitaliz) {
    this.name = name;
    this.rate = rate;
    this.capitaliz = capitaliz; //кол-во капитализаций в году
  }
}

function getProduct() {
  prods.push(new Product (
    document.querySelector('#name').value,
    document.querySelector('#rate').value,
    document.querySelector('#capitaliz').value,
  ))
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
  });
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
        const calc = (values[0] * Math.pow(1 + obj[i + 1] / 100 / obj[i + 2]
                                          , values[1] * obj[i + 2])).toFixed(2);
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
document.querySelector('#submit').addEventListener('click', cloneForm);