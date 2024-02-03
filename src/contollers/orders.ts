import express from 'express';
import { createOrder, deleteOrderById, getAllOrders, getUserOrders, updateOrderById } from '../db/order';
import { getuserBySessionToken } from '../db/user';
import { getProductById, getProductByName } from '../db/product';

export const registerOrder = async (req: express.Request, res: express.Response) =>{
    try {
        const { productname, quantity, details } = req.body;
        const userSessionToken = req.cookies['CTRX-auth'];

        const existingUser = await getuserBySessionToken(userSessionToken);
        if(!existingUser){

            res.status(403).json({error: 'Unauthorized request'});
        }

        const username = existingUser.username;
        const existingProduct = await getProductByName(productname);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const inTotal = quantity * existingProduct.price;

        const createdOrder = await createOrder({username, productname, quantity, inTotal, details});
    
        return res.status(200).json(createdOrder);
    
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

export const getOrders = async (req: express.Request, res: express.Response) =>{
    try { 
        const orders = await getAllOrders();
        return res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

export const getUsersOrders = async (req: express.Request, res: express.Response) =>{
    try {
        const {username} = req.params;
        const orders = await getUserOrders(username);
        return res.status(200).json(orders);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

export const deleteOrder = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const deletedOrder = await deleteOrderById(id);

        return res.json(deletedOrder);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
        
    }
};

export const updateOrder = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const {quantity, details} = req.body;
        getProductById(id).then(product=>{
            const inTotal = quantity ? quantity * product.price : 0;
            const updatedOrder = updateOrderById(id, {quantity,inTotal, details});
            return res.status(200).json(updatedOrder);
        }).catch(err=>{
            return res.status(404).json({ message: 'Product not found' });
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};