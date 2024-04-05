import express from "express"
import addRecipeController from "../controllers/HealthRecipes/addRecipeController"
import getAllRecipes from "../controllers/HealthRecipes/getAllRecipeController"
import getRecipeById from "../controllers/HealthRecipes/getRecipeByIdController"

import verifyToken from "../middleware/tokenValidation"
import deleteRecipe from "../controllers/HealthRecipes/deleteRecipeController"
import updateRecipe from "../controllers/HealthRecipes/updateRecipeController"


const recipe = express.Router()
recipe.post("/addrecipe", verifyToken , addRecipeController)
recipe.get("/getrecipe" , verifyToken, getAllRecipes)
recipe.get("/getrecipe/:id" , verifyToken, getRecipeById)
recipe.put('/updaterecipe/:id' , verifyToken, updateRecipe);
recipe.delete('/deleterecipe/:id', verifyToken , deleteRecipe);

export default recipe