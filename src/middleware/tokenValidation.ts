import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as apiResponse  from "../helper/apiResponse";


interface customRequest extends Request {
user?:string;
}
const verifyToken = (req: customRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return apiResponse.errorResponse(res, "Authorization header is missing");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return apiResponse.errorResponse(res, "Token is missing");
        }

        jwt.verify(token,"S2k3c0efrsfdsdsdfff2dsasdfd", (err: any, decoded: any) => {
            if (err) {
                return apiResponse.unauthorizedResponse(res, "Token is not valid");
            }
          
            req.user = decoded.id;
           
            next();
        });
    } catch (error) {
        return apiResponse.errorResponse(res, "Internal server error");
    }
};

export default verifyToken;
