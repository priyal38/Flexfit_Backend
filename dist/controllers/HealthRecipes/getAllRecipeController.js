"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthRecipes_1 = __importDefault(require("../../models/healthRecipes"));
const apiResponse = __importStar(require("../../helper/apiResponse"));
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const perPage = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.perPage) || 3;
        const query = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.query) || '';
        let recipeQuery = healthRecipes_1.default.find();
        if (query) {
            recipeQuery = recipeQuery.or([
                { title: { $regex: query, $options: 'i' } },
                { mealType: { $regex: query, $options: 'i' } },
                { dietaryType: { $regex: query, $options: 'i' } },
            ]);
        }
        const totalRecipe = yield healthRecipes_1.default.countDocuments(recipeQuery);
        const recipes = yield recipeQuery
            .skip((page - 1) * perPage)
            .limit(perPage);
        if (recipes.length > 0) {
            apiResponse.successResponseWithData(res, "Recipe found", {
                recipes,
                currentPage: page,
                totalPages: Math.ceil(totalRecipe / perPage)
            });
        }
        else {
            apiResponse.notFoundResponse(res, "Recipe not found");
        }
    }
    catch (err) {
        return apiResponse.errorResponseWithData(res, "Error in getting recipes", err);
    }
});
exports.default = getAllRecipes;
