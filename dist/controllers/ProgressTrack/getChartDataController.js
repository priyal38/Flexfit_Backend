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
const userWorkoutModel_1 = __importDefault(require("../../models/progressTrack/userWorkoutModel"));
const getChartDataByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const selectedDateStr = req.query.selectedDate;
        const selectedDate = new Date(selectedDateStr);
        // Find workouts for the user where the selected date falls within the range
        const workouts = yield userWorkoutModel_1.default.find({
            userId,
            startDate: { $lte: selectedDate },
            endDate: { $gte: selectedDate }
        }).populate('workoutId', 'title');
        if (workouts) {
            // Check completion status for each workout for the selected date
            const workoutsWithCompletionStatus = workouts.map(workout => {
                const completionStatus = workout.completionStatus.find(status => {
                    return status.date.toDateString() === new Date(selectedDate).toDateString();
                });
                return Object.assign(Object.assign({}, workout.toObject()), { completed: completionStatus ? completionStatus.checked : false });
            });
            return apiResponse.successResponseWithData(res, "Workout found", workoutsWithCompletionStatus);
        }
    }
    catch (error) {
        console.log(error);
        apiResponse.errorResponse(res, "Error in getting workouts for the selected date");
    }
});
exports.default = getChartDataByDate;
