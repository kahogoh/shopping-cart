import ProductsAPI from './products.mock';

export const getProducts = async () => await ProductsAPI.getList();
