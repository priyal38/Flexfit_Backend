"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    explanation: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    thumbnail: { type: String, required: true },
    equipment: { type: String },
    videoUrl: { type: String, required: true }
});
const WorkoutModel = mongoose_1.default.model("Workout", workoutSchema);
exports.default = WorkoutModel;
