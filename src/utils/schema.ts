import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);


const authSignup = Joi.object().keys({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname:Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  refreshToken: Joi.string().allow('').optional(),
});

const authLogin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const authForgotPass = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
})

const addWorkout = Joi.object().keys({
    title:Joi.string().required(),
    category:Joi.string().required(),
    difficultyLevel:Joi.string().required(),
    explanation:Joi.string().required(),
    videoUrl:Joi.string().required(),
    subCategory: Joi.string().allow('').optional(),
    equipment:Joi.string().allow('').optional()
})

const addBlog = Joi.object().keys({
    content:Joi.string().required(),
    title:Joi.string().required(),
    category:Joi.string().required(),
    readtime:Joi.number().required(),
    author:Joi.string().required(),
    subtitle:Joi.string().allow('').optional()
  
})
  
  const addRecipe = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    mealType: Joi.string().required(),
    dietaryType: Joi.string().required(),
    prepTime: Joi.number().required(),
    cookTime: Joi.number().required(),
    nutritionFacts: Joi.string().required(),
    ingredients:Joi.string().required(),
    instructions: Joi.string().required(),
    
  });
  

export default {
  "/login": authLogin,
  "/signup": authSignup,
  "/addworkout":addWorkout,
  "/addblog":addBlog,
  "/addrecipe":addRecipe,
  "/forgot":authForgotPass
} as { [key: string]: ObjectSchema };