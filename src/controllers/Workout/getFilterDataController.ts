import { Request, Response } from "express";
import WorkoutModel from "../../models/workoutModel";
import * as apiResponse from "../../helper/apiResponse";

const getFilterData = async (req: Request, res: Response) => {


    try {
        const categories = await WorkoutModel.distinct('category');
        const subcategories = await WorkoutModel.distinct('subCategory');
        const difficultyLevels = await WorkoutModel.distinct('difficultyLevel');
        if (categories && subcategories && difficultyLevels) {
            apiResponse.successResponseWithData(res, "Filterdata found ", { categories, subcategories, difficultyLevels })
        }

        else {

            return apiResponse.notFoundResponse(res, "filterdata not found");
        }
    }
    catch (err) {
        return apiResponse.errorResponseWithData(res, "Error in getting filterdata", err)

    }
}

export default getFilterData