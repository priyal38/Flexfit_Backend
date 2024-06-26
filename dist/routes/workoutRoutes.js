"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addWorkoutController_1 = __importDefault(require("../controllers/Workout/addWorkoutController"));
const getAllWorkoutController_1 = __importDefault(require("../controllers/Workout/getAllWorkoutController"));
const getWorkoutByIdController_1 = __importDefault(require("../controllers/Workout/getWorkoutByIdController"));
const getFilterDataController_1 = __importDefault(require("../controllers/Workout/getFilterDataController"));
const tokenValidation_1 = __importDefault(require("../middleware/tokenValidation"));
const updateWorkoutController_1 = __importDefault(require("../controllers/Workout/updateWorkoutController"));
const deleteWorkoutController_1 = __importDefault(require("../controllers/Workout/deleteWorkoutController"));
const workout = express_1.default.Router();
workout.post('/addworkout', tokenValidation_1.default, addWorkoutController_1.default);
workout.get('/getworkout', getAllWorkoutController_1.default);
workout.get('/getworkout/:id', tokenValidation_1.default, getWorkoutByIdController_1.default);
workout.get('/getfilterdata', tokenValidation_1.default, getFilterDataController_1.default);
workout.put('/updateworkout/:id', tokenValidation_1.default, updateWorkoutController_1.default);
workout.delete('/deleteworkout/:id', tokenValidation_1.default, deleteWorkoutController_1.default);
exports.default = workout;
