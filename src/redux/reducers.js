import { combineReducers } from 'redux';

import { default as products } from './modules/products/products.duck';
import { default as carts } from './modules/carts/carts.duck';

export const rootReducer = combineReducers({
  products,
  carts
});

export default rootReducer;
