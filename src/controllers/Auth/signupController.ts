import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as apiResponse from "../../helper/apiResponse";
import UserModel from "../../models/userModel";
import { encryptPass } from "../../helper/passEncDes";

const Signup =
  async (req: Request, res: Response) => {
   
    const { firstname, lastname, email, password  , gender , dob , height , weight , bio , profilePhoto} = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return apiResponse.AlreadyExists(res, 'User alreasy exist')
      }

      const hashedPassword = await encryptPass(password)
      const user = await UserModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        gender:'',
        dob:'',
        height:'',
        weight:'',
        bio:'',
        profilePhoto:''

      });
    user.save();
   
      if (user) {
        return apiResponse.successResponse(res , 'User added')

      } 
     
    } 
     catch (error) {
        console.log(error);
        apiResponse.errorResponse(res, 'User Not  Added')
    }
  }

export default Signup;
