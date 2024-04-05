import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel";

const getAllDataByUserid = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user;

        const workouts = await UserWorkoutModel.find({
            userId,
        })
        return apiResponse.successResponseWithData(res, "Workout found", workouts);
    }
    catch (error) {
        console.log(error);
        apiResponse.errorResponse(res, "Error in getting workouts for the selected date");
    }
};

export default getAllDataByUserid;
