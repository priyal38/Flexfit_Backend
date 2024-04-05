
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';


 const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = (req as any).user;
        const user = await UserModel.findById(userId)
        if(user?.role !== 1){
           return res.status(400).send({
            success : false,
            message : "Unauthorized Access"
           })
        }else{
            next();
        }
    } catch (error) {
        
        console.log(error);
    }
}

export default isAdmin