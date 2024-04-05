import { Request, Response } from "express";

import * as apiResponse from "../../helper/apiResponse";
import WorkoutModel from "../../models/workoutModel";
import { upload } from "../../helper/multerConfig";
import schemaValidator from "../../middleware/schemaValidator";

const addWorkout = [
  upload.single('thumbnail'),
  schemaValidator("/addworkout"),
  async (req: Request, res: Response) => {
    
    const {
      title,
      category,
      subCategory,
      explanation,
      difficultyLevel,
      videoUrl,
      equipment
      
    } = req.body;
    try {
      const workout = await WorkoutModel.create({
        title,
        category,
        subCategory,
        explanation,
        difficultyLevel,
        thumbnail:req.file?.path,
        videoUrl,
        equipment
      });
      workout.save();

      if (workout) {
        return apiResponse.successResponse(res, "new workout added");
      }
    } catch (error) {
      console.log(error);
      apiResponse.errorResponse(res, " workout not  added");
    }
  },
];
  
export default addWorkout;

