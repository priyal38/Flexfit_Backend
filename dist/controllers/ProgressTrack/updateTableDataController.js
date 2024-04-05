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
const userWorkoutModel_1 = __importDefault(require("../../models/progressTrack/userWorkoutModel")); // Assuming you've renamed and combined the schemas as WorkoutModel
const updateTabledata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userId = req.user;
        const { targetDays, duration, title, startDate } = req.body;
        const endDate = new Date(startDate);
        // Add targetDays to endDate based on workout type
        endDate.setDate(endDate.getDate() + (parseInt(targetDays) - 1));
        // Define common properties for the update
        const updateProperties = {
            targetDays,
            duration,
            startDate,
            endDate
        };
        if (req.body.workoutType === "custom") {
            updateProperties.title = title;
        }
        // Find the workout by ID and update only specified fields
        const updatedWorkout = yield userWorkoutModel_1.default.findByIdAndUpdate(id, updateProperties, { new: true });
        if (!updatedWorkout) {
            return apiResponse.errorResponse(res, "Workout not found");
        }
        return apiResponse.successResponseWithData(res, "Workout updated", updatedWorkout);
    }
    catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Internal server error");
    }
});
exports.default = updateTabledata;
