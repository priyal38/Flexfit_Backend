import { Request , Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";

const getWorkoutById = async(req:Request , res:Response) =>{

    const id = req.params.id;
    try{
        const workout = await WorkoutModel.findById(id);
          if(workout){
            apiResponse.successResponseWithData(res , "workout found" , workout)
          }
          
            else {
               
                return apiResponse.notFoundResponse(res, "workout not found");
            }
          }
    catch(err){
        return apiResponse.errorResponseWithData(res,"Error in getting workouts",err)

    }
}

export default getWorkoutById