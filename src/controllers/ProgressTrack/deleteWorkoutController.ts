
import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel"; 

const deleteTableData = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user;
        const workoutId = req.params.id; 
        
      
        const deletedWorkout = await UserWorkoutModel.findByIdAndDelete(workoutId);

        if (!deletedWorkout) {
            return apiResponse.errorResponse(res, "Workout not found");
        }

        return apiResponse.successResponseWithData(res, "Workout deleted", deletedWorkout);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Internal server error");
    }
};

export default deleteTableData