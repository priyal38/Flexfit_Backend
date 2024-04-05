import { Request , Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipes";
import * as apiResponse from "../../helper/apiResponse";

const getRecipeById = async(req:Request , res:Response) =>{

    const id = req.params.id;
    try{
        const recipe = await HealthyRecipesModel.findById(id);
          if(recipe){
            apiResponse.successResponseWithData(res , "recipe found" , recipe)
          }
          
            else {
               
                return apiResponse.notFoundResponse(res, "recipe not found");
            }
          }
    catch(err){
        return apiResponse.errorResponseWithData(res,"Error in getting recipe",err)

    }
}

export default getRecipeById