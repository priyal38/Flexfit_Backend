import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import BlogModel from "../../models/blogModel";
import WorkoutModel from "../../models/workoutModel";
import HealthyRecipesModel from "../../models/healthRecipes";
import UserModel from "../../models/userModel";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel";

const getAdminCardData = async(req:Request,res:Response) =>{

    try {
        const workouts =  await WorkoutModel.countDocuments()
        const blogs =  await BlogModel.countDocuments()
        const recipes = await HealthyRecipesModel.countDocuments()
        const users =  await UserModel.countDocuments({ role: { $ne: 1 } }) // ne:not equal to
        const userworkouts =  await UserWorkoutModel.countDocuments({workoutType : "predefined"})


        const responseData = {
            workouts,
            blogs,
            recipes,
            users,
            userworkouts
        };



        return apiResponse.successResponseWithData(res, "Admin card data fetched successfully", responseData);
    } catch (error) {
        return apiResponse.errorResponse(res, "An error occurred in fetching admin card data");
    }
}

export default getAdminCardData