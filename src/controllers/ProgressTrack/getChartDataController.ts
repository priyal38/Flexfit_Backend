import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel"; 

const getChartDataByDate = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user;
        const selectedDateStr = req.query.selectedDate as string;
        const selectedDate = new Date(selectedDateStr);

        // Find workouts for the user where the selected date falls within the range

        const workouts = await UserWorkoutModel.find({
            userId,
            startDate: { $lte: selectedDate },
            endDate: { $gte: selectedDate }
        }).populate('workoutId', 'title')

        if (workouts) {
            // Check completion status for each workout for the selected date
            const workoutsWithCompletionStatus = workouts.map(workout => {
                const completionStatus = workout.completionStatus.find(status => {
                    return status.date.toDateString() === new Date(selectedDate).toDateString();
                });
               
                return {
                    ...workout.toObject(),
                    completed: completionStatus ? completionStatus.checked : false,
                    
                };
            });

            
                return apiResponse.successResponseWithData(res, "Workout found", workoutsWithCompletionStatus);
            
          
        } 
    } catch (error) {
        console.log(error);
        apiResponse.errorResponse(res, "Error in getting workouts for the selected date");
    }
};

export default getChartDataByDate;
