import { Request, Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipes";
import * as apiResponse from "../../helper/apiResponse";

const deleteRecipe = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const deletedRecipe= await HealthyRecipesModel.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return apiResponse.notFoundResponse(res, "Recipe not found");
        }
        apiResponse.successResponse(res, "Recipe deleted successfully");
    } catch (error) {
        console.log(error)
        return apiResponse.errorResponseWithData(res, "Error in updating Recipe", error);
    }

}

export default deleteRecipe