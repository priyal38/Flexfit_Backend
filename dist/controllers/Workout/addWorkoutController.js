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
const workoutModel_1 = __importDefault(require("../../models/workoutModel"));
const multerConfig_1 = require("../../helper/multerConfig");
const schemaValidator_1 = __importDefault(require("../../middleware/schemaValidator"));
const addWorkout = [
    multerConfig_1.upload.single('thumbnail'),
    (0, schemaValidator_1.default)("/addworkout"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { title, category, subCategory, explanation, difficultyLevel, videoUrl, equipment } = req.body;
        try {
            const workout = yield workoutModel_1.default.create({
                title,
                category,
                subCategory,
                explanation,
                difficultyLevel,
                thumbnail: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
                videoUrl,
                equipment
            });
            workout.save();
            if (workout) {
                return apiResponse.successResponse(res, "new workout added");
            }
        }
        catch (error) {
            console.log(error);
            apiResponse.errorResponse(res, " workout not  added");
        }
    }),
];
exports.default = addWorkout;
