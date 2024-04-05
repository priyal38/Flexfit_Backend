import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import HealthyRecipesModel from "../../models/healthRecipes";
import { upload } from "../../helper/multerConfig";
import schemaValidator from "../../middleware/schemaValidator";




const addRecipe = [
    upload.single('image'),
    schemaValidator('/addrecipe'),
    async (req: Request, res: Response) => {
       
        
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
      
        try {
            const healthyRecipes = await HealthyRecipesModel.create({
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
            });
            healthyRecipes.save();
       

            if (healthyRecipes) {
                return apiResponse.successResponse(res, "new recipe added");
            }
        } catch (error) {
            console.log(error);
            apiResponse.errorResponse(res, " recipe not added");
        }
    },
];

export default addRecipe;  
