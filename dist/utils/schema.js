"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})");
const authSignup = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(PASSWORD_REGEX).min(8).required(),
    refreshToken: joi_1.default.string().allow('').optional(),
});
const authLogin = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const authForgotPass = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required(),
});
const addWorkout = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    difficultyLevel: joi_1.default.string().required(),
    explanation: joi_1.default.string().required(),
    videoUrl: joi_1.default.string().required(),
    subCategory: joi_1.default.string().allow('').optional(),
    equipment: joi_1.default.string().allow('').optional()
});
const addBlog = joi_1.default.object().keys({
    content: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    readtime: joi_1.default.number().required(),
    author: joi_1.default.string().required(),
    subtitle: joi_1.default.string().allow('').optional()
});
const addRecipe = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    mealType: joi_1.default.string().required(),
    dietaryType: joi_1.default.string().required(),
    prepTime: joi_1.default.number().required(),
    cookTime: joi_1.default.number().required(),
    nutritionFacts: joi_1.default.string().required(),
    ingredients: joi_1.default.string().required(),
    instructions: joi_1.default.string().required(),
});
exports.default = {
    "/login": authLogin,
    "/signup": authSignup,
    "/addworkout": addWorkout,
    "/addblog": addBlog,
    "/addrecipe": addRecipe,
    "/forgot": authForgotPass
};
