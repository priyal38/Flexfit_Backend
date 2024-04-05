import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel"; // Assuming you've renamed and combined the schemas as WorkoutModel

const updateTabledata= async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const userId = (req as any).user;
        const {  targetDays, duration, title, startDate } = req.body;
        const endDate = new Date(startDate);
        
        // Add targetDays to endDate based on workout type
        endDate.setDate(endDate.getDate() + (parseInt(targetDays) - 1));

        // Define common properties for the update
        const updateProperties :any= {
            targetDays,
            duration,
            startDate,
            endDate
        };

        if (req.body.workoutType === "custom") {
            updateProperties.title = title;
        }
        // Find the workout by ID and update only specified fields
        const updatedWorkout = await UserWorkoutModel.findByIdAndUpdate(
            id,
            updateProperties,
            { new: true }
        );

        if (!updatedWorkout) {
            return apiResponse.errorResponse(res, "Workout not found");
        }

        return apiResponse.successResponseWithData(res, "Workout updated", updatedWorkout);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Internal server error");
    }
};

export default updateTabledata