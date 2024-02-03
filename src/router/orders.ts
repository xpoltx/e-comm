import express from 'express';

import { registerOrder, getOrders, getUsersOrders, deleteOrder, updateOrder } from '../contollers/orders';
import { isAuthenticated } from '../middlewares/userStatus';

export default (router: express.Router)=>{
    router.post('/registerOrder',isAuthenticated, registerOrder);
    router.get('/allOrders', getOrders);
    router.get('/orders/:username', getUsersOrders);
    router.delete('/deleteOrder/:id',isAuthenticated,deleteOrder);
    router.patch('/updateOrder/:id', isAuthenticated, updateOrder);
}