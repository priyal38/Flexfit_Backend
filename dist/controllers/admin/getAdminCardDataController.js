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
const apiResponse = __importStar(require("../../helper/apiResponse"));
const blogModel_1 = __importDefault(require("../../models/blogModel"));
const workoutModel_1 = __importDefault(require("../../models/workoutModel"));
const healthRecipes_1 = __importDefault(require("../../models/healthRecipes"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const userWorkoutModel_1 = __importDefault(require("../../models/progressTrack/userWorkoutModel"));
const getAdminCardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield workoutModel_1.default.countDocuments();
        const blogs = yield blogModel_1.default.countDocuments();
        const recipes = yield healthRecipes_1.default.countDocuments();
        const users = yield userModel_1.default.countDocuments({ role: { $ne: 1 } }); // ne:not equal to
        const userworkouts = yield userWorkoutModel_1.default.countDocuments({ workoutType: "predefined" });
        const responseData = {
            workouts,
            blogs,
            recipes,
            users,
            userworkouts
        };
        return apiResponse.successResponseWithData(res, "Admin card data fetched successfully", responseData);
    }
    catch (error) {
        return apiResponse.errorResponse(res, "An error occurred in fetching admin card data");
    }
});
exports.default = getAdminCardData;
