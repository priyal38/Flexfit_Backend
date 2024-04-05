import { Request, Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";
import { upload } from "../../helper/multerConfig";

const updateWorkout = [

    upload.single('thumbnail'),

    async (req: Request, res: Response) => {
        try {
          
            const id = req.params.id;
            const {
                title,
          category,
          subCategory,
          explanation,
          difficultyLevel,
          videoUrl,
          equipment
            } = req.body;
    
           
            const workout = await WorkoutModel.findByIdAndUpdate(id , {
                title,
            category,
            subCategory,
            explanation,
            difficultyLevel,
            thumbnail:req.file?.path,
            videoUrl,
            equipment
            } , {new:true} );

            if (!workout) {
                return apiResponse.notFoundResponse(res, "Workout not found");
            }
    
           
        
            // Save updated user
            await workout.save();
    
            // Respond with updated user data
            apiResponse.successResponseWithData(res, "Workout updated successfully", workout);
        } catch (err) {
            console.log(err)
            return apiResponse.errorResponseWithData(res, "Error in updating Workout", err);
        }
    }
    

]
export default updateWorkout;
