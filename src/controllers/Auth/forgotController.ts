import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";

import UserModel from "../../models/userModel";
import { encryptPass } from "../../helper/passEncDes";


const ForgotPassword =
 

  async (req: Request, res: Response) => {

    try{
      
    const { email, password ,confirmPassword} = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse.errorResponse(res, "Invalid Email");
    }

    if(password === confirmPassword){
        const hashedPassword = await encryptPass(password)
        await UserModel.findByIdAndUpdate(user._id , {password:hashedPassword})
        return apiResponse.successResponse(res , "Password updated successfully!!!")
    }
    else{
        return apiResponse.errorResponse(res, "Password is not match with confirm password!!");
    }
   
  }
  catch (error) {
     return apiResponse.errorResponse(res, ' Error occured in change password');
  }

}



export default ForgotPassword;
