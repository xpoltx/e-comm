import express from "express";

import authentication from "./authentication";
import users from "./users";
import products from "./products";
import orders from "./orders";
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    products(router);
    orders(router);
    return router;
}