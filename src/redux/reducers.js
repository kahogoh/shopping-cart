import { combineReducers } from 'redux';

import { default as products } from './modules/products/products.duck';

export const rootReducer = combineReducers({
  products
});

export default rootReducer;
