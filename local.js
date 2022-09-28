// localStorage0
import './script.js';

const firstDeposit = {
  name: 'Cool',
  rate: 10,
  capitaliz: 4,
}

const secondDeposit = {
  name: 'Bla',
  rate: 7,
  capitaliz: 2,
}

localStorage.setItem('deposit1', JSON.stringify(firstDeposit));
const deposit1 = localStorage.getItem('deposit1');
JSON.parse(deposit1);

localStorage.setItem('deposit2', JSON.stringify(secondDeposit));
const deposit2 = localStorage.getItem('deposit2');
JSON.parse(deposit2);

prods.push(firstDeposit, secondDeposit)