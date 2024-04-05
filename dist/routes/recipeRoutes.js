"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addRecipeController_1 = __importDefault(require("../controllers/HealthRecipes/addRecipeController"));
const getAllRecipeController_1 = __importDefault(require("../controllers/HealthRecipes/getAllRecipeController"));
const getRecipeByIdController_1 = __importDefault(require("../controllers/HealthRecipes/getRecipeByIdController"));
const tokenValidation_1 = __importDefault(require("../middleware/tokenValidation"));
const deleteRecipeController_1 = __importDefault(require("../controllers/HealthRecipes/deleteRecipeController"));
const updateRecipeController_1 = __importDefault(require("../controllers/HealthRecipes/updateRecipeController"));
const recipe = express_1.default.Router();
recipe.post("/addrecipe", tokenValidation_1.default, addRecipeController_1.default);
recipe.get("/getrecipe", tokenValidation_1.default, getAllRecipeController_1.default);
recipe.get("/getrecipe/:id", tokenValidation_1.default, getRecipeByIdController_1.default);
recipe.put('/updaterecipe/:id', tokenValidation_1.default, updateRecipeController_1.default);
recipe.delete('/deleterecipe/:id', tokenValidation_1.default, deleteRecipeController_1.default);
exports.default = recipe;
