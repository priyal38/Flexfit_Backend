import { Request, Response } from "express";
import UserModel from "../../models/userModel";
import * as apiResponse from "../../helper/apiResponse";

const updateUserData = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user;
        const {
            firstname,
            lastname,
            email,
            gender,
            height,
            role,
            dob,
            weight,
            bio
        } = req.body;

       
        const user = await UserModel.findByIdAndUpdate(userId , {
            firstname,
            lastname,
            email,
            gender,
            height,
            role,
            dob,
            weight,
            bio
        } , {new:true} );
        if (!user) {
            return apiResponse.notFoundResponse(res, "User not found");
        }

       
    
        // Save updated user
        await user.save();

        // Respond with updated user data
        apiResponse.successResponseWithData(res, "User updated successfully", user);
    } catch (err) {
        console.log(err)
        return apiResponse.errorResponseWithData(res, "Error in updating user", err);
    }
};

export default updateUserData;
