import { CustomRequest, IUser } from "@/types";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const printTimestamp = (request: CustomRequest, response: Response, nextFunction: NextFunction) => {
    console.log(' Accessing ${request.originalUrl}: $(new Date().toString()}');

    console.log('Dari Miidleware printTimestamp', request.headers['authorization']);
    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')?.[1]

    if(!token){
        return response.status(401).json({
            message: 'Unauthorized !!!!',
        });
    }

    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if(err){
            return response.status(403).json({ 
                message: 'Forbidden !!!!',
            });
        } else {

    const user = decoded as IUser;
    request.user = user;
    nextFunction();
        }
})
};