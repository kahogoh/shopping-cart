import { delay } from '@redux-saga/core/effects';

const PRODUCT_LIST = [
  {
    name: 'Sledgehammer',
    price: 125.75
  },
  {
    name: 'Axe',
    price: 190.5
  },
  {
    name: 'Bandsaw',
    price: 562.13
  },
  {
    name: 'Chisel',
    price: 12.9
  },
  {
    name: 'Hacksaw',
    price: 18.45
  }
];

const getList = async () => {
  await delay(200);
  return PRODUCT_LIST;
};

export default {
  getList
};
