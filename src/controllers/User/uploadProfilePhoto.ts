import { Request, Response } from "express";
import UserModel from "../../models/userModel";
import * as apiResponse from "../../helper/apiResponse";
import { upload } from "../../helper/multerConfig";

const uploadProfilePhoto =  [
    upload.single('profilePhoto'),

    async (req: Request, res: Response) => {
        try {
   
    
            const userId = (req as any).user;
         
            const user = await UserModel.findByIdAndUpdate(userId , {profilePhoto:req.file?.path} , {new:true});
            if (!user) {
                return apiResponse.notFoundResponse(res, "User not found");
            }
    
         
            await user.save();
    
          
            apiResponse.successResponseWithData(res, "User updated successfully", user);
        } catch (err) {
            return apiResponse.errorResponseWithData(res, "Error in updating user", err);
        }
    }
    

]
export default uploadProfilePhoto;
