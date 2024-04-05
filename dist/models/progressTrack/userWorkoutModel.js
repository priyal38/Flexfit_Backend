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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define a Mongoose schema for the combined Workout interface
const userWorkoutSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout' }, // Only present for PredefinedWorkout
    title: { type: String }, // Only present for CustomWorkout
    targetDays: { type: Number, required: true },
    completedDays: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    workoutType: { type: String, enum: ['custom', 'predefined'] },
    completionStatus: [{
            date: { type: Date, default: new Date() },
            checked: { type: Boolean, default: false }
        }]
});
// Define a Mongoose model for the combined schema
const UserWorkoutModel = mongoose_1.default.model("UserWorkout", userWorkoutSchema);
exports.default = UserWorkoutModel;
