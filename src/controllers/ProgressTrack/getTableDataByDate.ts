import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import UserWorkoutModel from "../../models/progressTrack/userWorkoutModel"; // Import the combined schema

const getWorkoutDataByDate = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user;
        const selectedDateStr = req.query.selectedDate as string;
        const selectedDate = new Date(selectedDateStr);
        const page = parseInt(req.query?.page as string) || 1;
      const perPage = parseInt(req.query?.perPage as string) || 3;

        // Find workouts for the user where the selected date falls within the range

        const totalWorkout = await UserWorkoutModel.countDocuments({ userId,
            startDate: { $lte: selectedDate },
            endDate: { $gte: selectedDate }});

           
            

        const workouts = await UserWorkoutModel.find({
            userId,
            startDate: { $lte: selectedDate },
            endDate: { $gte: selectedDate }
        }).populate('workoutId', 'title').skip((page - 1) * perPage)
        .limit(perPage);


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

            
                return apiResponse.successResponseWithData(res, "Workout found", {
                  workouts:workoutsWithCompletionStatus,
                    currentPage: page,
                    totalPages: Math.ceil(totalWorkout/ perPage)
                });
            
          
        } 
    } catch (error) {
        console.log(error);
        apiResponse.errorResponse(res, "Error in getting workouts for the selected date");
    }
};

export default getWorkoutDataByDate;
