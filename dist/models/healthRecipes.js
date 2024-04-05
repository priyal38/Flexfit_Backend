"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HealthyRecipesSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mealType: { type: String, required: true },
    dietaryType: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    nutritionFacts: {
        calories: { type: Number, required: true },
        carbohydrates: { type: Number, required: true },
        protein: { type: Number, required: true },
        totalfat: { type: Number, required: true }
    },
    ingredients: [{
            name: { type: String, required: true },
            quantity: { type: String, required: true },
            unit: { type: String }
        }],
    instructions: { type: [String], required: true },
    image: { type: String, }
});
const HealthyRecipesModel = mongoose_1.default.model("HealthyRecipes", HealthyRecipesSchema);
exports.default = HealthyRecipesModel;
