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
const workoutModel_1 = __importDefault(require("../../models/workoutModel"));
const apiResponse = __importStar(require("../../helper/apiResponse"));
const getAllWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const perPage = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.perPage) || 6;
        const { query, category, subCategory, difficultyLevel } = req.query;
        let workoutQuery = {};
        // build query 
        //   if (query) {
        //       const regex = new RegExp('\\b' + query + '\\b', 'i');
        //       workoutQuery.$or = [
        //           { title: new RegExp('\\b' + query + '\\b', 'i') },
        //           { category: regex },
        //           { subCategory: regex },
        //           { difficultyLevel: regex },
        //           { equipment: regex }
        //       ];
        //   }
        if (query) {
            const regex = new RegExp(query, 'i');
            workoutQuery.$or = [
                { title: regex },
                { category: regex },
                { subCategory: regex },
                { difficultyLevel: regex },
                { equipment: regex }
            ];
        }
        if (category || subCategory || difficultyLevel) {
            workoutQuery.$or = [];
            if (category) {
                workoutQuery.$or.push({ category: { $in: category } });
            }
            if (subCategory) {
                workoutQuery.$or.push({ subCategory: { $in: subCategory } });
            }
            if (difficultyLevel) {
                workoutQuery.$or.push({ difficultyLevel: { $in: difficultyLevel } });
            }
        }
        // console.log(workoutQuery);
        // fetch total count of matched workout
        const totalWorkout = yield workoutModel_1.default.countDocuments(workoutQuery);
        // fetch paginated workout data
        const workouts = yield workoutModel_1.default.find(workoutQuery)
            .skip((page - 1) * perPage)
            .limit(perPage);
        if (workouts.length > 0) {
            apiResponse.successResponseWithData(res, "Workout found", {
                workouts,
                currentPage: page,
                totalPages: Math.ceil(totalWorkout / perPage)
            });
        }
        else {
            apiResponse.notFoundResponse(res, "Workout not found");
        }
    }
    catch (err) {
        return apiResponse.errorResponseWithData(res, "Error in getting workouts", err);
    }
});
exports.default = getAllWorkout;
