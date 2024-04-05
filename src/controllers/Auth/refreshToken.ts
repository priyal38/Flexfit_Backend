import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as apiResponse from "../../helper/apiResponse";

const JWT_REFRESH_SECRET = "priyal";
const JWT_SECRET = "S2k3c0efrsfdsdsdfff2dsasdfd";


 const refreshTokenGenerate = async(req:Request,res:Response)=>{
 
    const cookies = await req.cookies;

   
    if (!cookies?.refreshtoken) return res.sendStatus(401);
   
 
    const refreshToken = cookies.refreshtoken;
 
    if (!refreshToken) {
        return apiResponse.unauthorizedResponse(res , "Access Denied. No refresh token provided")
      
      }

 
       
    jwt.verify(
        refreshToken,
        JWT_REFRESH_SECRET,
        (err:any , decoded:any)=>{
            if(err){
               
                return apiResponse.unauthorizedResponse(res , "Refresh token is not valid")
            }
 
 
            const token = jwt.sign({ id: decoded.id }, "S2k3c0efrsfdsdsdfff2dsasdfd" , {expiresIn : "1d"});
 
            // res.json({token});
           return  apiResponse.successResponseWithData(res , 'new accesstokem' , token)
        }
    )
    }
 
export default refreshTokenGenerate