import express from 'express';

import { registerProduct, getProducts, updateProduct, deleteProduct } from '../contollers/products';
import { isAuthenticated } from '../middlewares/userStatus';

export default (router: express.Router) =>{
    router.post('/registerProduct', isAuthenticated, registerProduct);
    router.get('/products', getProducts);
    router.delete('/product/:id',isAuthenticated,deleteProduct);
    router.patch('/product/:id', isAuthenticated, updateProduct);
};