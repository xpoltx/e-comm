import express from "express";

import { createProduct, getAllProducts, deleteProductById, updateProductById, getProductByName, getProductById } from "../db/product";

export const registerProduct =async (req:express.Request, res: express.Response) => {
    try {
        const {name, price, quantity, color, description} = req.body;
        

        if(!name || !price){
            return res.status(400).json({error: 'Missing argument'});
        }

        const existingProduct = await getProductByName(name);

        if(existingProduct){
            return res.status(400).json({error: 'Product already exist'});
        }

        const product = await createProduct({
            name,
            price,
            quantity,
            color,
            description
        });

        return res.status(200).json(product);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

export const getProducts =async (req:express.Request, res: express.Response) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

export const deleteProduct = async (req:express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const deletedProduct = await deleteProductById(id);

        return res.json(deletedProduct);
    
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};


export const updateProduct = async (req:express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const {quantity, color, description} = req.body;

        const product = await getProductById(id);

        product.quantity = quantity;
        product.color = color;
        product.description = description;

        await product.save();

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}