import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../contollers/users';
import { isAuthenticated, isOwner } from '../middlewares/userStatus';

export default (router: express.Router) =>{
    router.get('/users',isAuthenticated, getAllUsers);
    router.delete('/user/:id',isAuthenticated,isOwner,deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);

};