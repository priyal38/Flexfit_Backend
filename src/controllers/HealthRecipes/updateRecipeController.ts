import { Request, Response } from "express";
import HealthyRecipesModel from "../../models/healthRecipes";
import * as apiResponse from "../../helper/apiResponse";
import { upload } from "../../helper/multerConfig";

const updateRecipe= [

    upload.single('image'),

    async (req: Request, res: Response) => {
        try {
          
            const id = req.params.id;
            const {
                title,
            description,
            mealType,
            dietaryType,
            nutritionFacts,
            prepTime,
            cookTime,
            instructions,
            ingredients
              } = req.body;
    
           
            const recipe = await HealthyRecipesModel.findByIdAndUpdate(id , {
                title,
                description,
                mealType,
                dietaryType,
                prepTime,
                cookTime,
                nutritionFacts :JSON.parse(nutritionFacts),
                instructions:JSON.parse(instructions),
                ingredients : JSON.parse(ingredients),
                image: req.file?.path
            } , {new:true} );

            if (!recipe) {
                return apiResponse.notFoundResponse(res, "Recipe not found");
            }
    
        
            await recipe.save();
    
          
            apiResponse.successResponseWithData(res, "Recipe updated successfully", recipe);
        } catch (err) {
            console.log(err)
            return apiResponse.errorResponseWithData(res, "Error in updating recipe", err);
        }
    }
    

]
export default updateRecipe;
