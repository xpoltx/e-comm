import express from 'express';
import {get, merge} from 'lodash';

import { getuserBySessionToken } from '../db/user';

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try {
        const sessionToken = req.cookies['CTRX-auth'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getuserBySessionToken(sessionToken);

        if(!existingUser){
            res.sendStatus(403);
        }

        merge(req, { identity: existingUser});

        return next();
 
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isOwner =async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;

        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(400);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(400);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}