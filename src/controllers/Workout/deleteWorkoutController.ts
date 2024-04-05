import { Request, Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";

const deleteWorkout = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return apiResponse.notFoundResponse(res, "Workout not found");
        }
        apiResponse.successResponse(res, "Workout deleted successfully");
    } catch (error) {
        console.log(error)
        return apiResponse.errorResponseWithData(res, "Error in updating Workout", error);
    }

}

export default deleteWorkout