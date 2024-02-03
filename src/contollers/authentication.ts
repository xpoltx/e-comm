import express from 'express';

import { getUserByEmail, createUser } from '../db/user';

import { random, authentication } from '../helpers/crypto';

export const login =async (req:express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({err: "Missing argument"});
        }
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(400).json({err: 'User not found'});
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash){
            return res.status(400).json({mess: "Wrong password"});
        } 

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('CTRX-auth', user.authentication.sessionToken, {domain: "localhost", path: "/"});

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(400).json({mess: 'Internal error'});
    }
    
}

export const register = async(req: express.Request, res: express.Response) =>{
    try {
        const { email, password, username } = req.body;

        if(!email || !password || !username){
            return res.status(400).json({err: "Missing argument"});
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({err: 'User already existing'});
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Smth went wrong'});
    }
}