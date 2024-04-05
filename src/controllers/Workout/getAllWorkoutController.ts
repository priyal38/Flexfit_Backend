import { Request , Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";

const getAllWorkout = async(req:Request , res:Response) =>{
    try{
      const page = parseInt(req.query?.page as string) || 1;
      const perPage = parseInt(req.query?.perPage as string) || 6;
      const { query  , category, subCategory, difficultyLevel } = req.query  ;

      let workoutQuery: any = {};


      // build query 
    //   if (query) {
    //       const regex = new RegExp('\\b' + query + '\\b', 'i');
    //       workoutQuery.$or = [
    //           { title: new RegExp('\\b' + query + '\\b', 'i') },
    //           { category: regex },
    //           { subCategory: regex },
    //           { difficultyLevel: regex },
    //           { equipment: regex }
    //       ];
    //   }

    if (query) {
        const regex = new RegExp( query as string, 'i');
        workoutQuery.$or = [
            { title: regex },
            { category: regex },
            { subCategory: regex },
            { difficultyLevel: regex },
            { equipment: regex }
        ];
    }

     
    if (category || subCategory || difficultyLevel) {
        workoutQuery.$or = [];
    
        if (category) {
            workoutQuery.$or.push({ category: { $in: category} });
        }
    
        if (subCategory) {
            workoutQuery.$or.push({ subCategory: { $in: subCategory }});
        }
    
        if (difficultyLevel) {
            workoutQuery.$or.push({ difficultyLevel: { $in: difficultyLevel }});
        }
    }
    // console.log(workoutQuery);
    

      // fetch total count of matched workout
      const totalWorkout = await WorkoutModel.countDocuments(workoutQuery);

      // fetch paginated workout data
      const workouts = await WorkoutModel.find(workoutQuery)
          .skip((page - 1) * perPage)
          .limit(perPage);

      if (workouts.length > 0) {
        apiResponse.successResponseWithData(res, "Workout found", {
          workouts,
            currentPage: page,
            totalPages: Math.ceil(totalWorkout/ perPage)
        });
        
    } else {
        apiResponse.notFoundResponse(res, "Workout not found");
    }
          }
    catch(err){
        return apiResponse.errorResponseWithData(res,"Error in getting workouts",err)

    }
}

export default getAllWorkout