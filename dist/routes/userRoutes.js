"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserProfileController_1 = __importDefault(require("../controllers/User/getUserProfileController"));
const tokenValidation_1 = __importDefault(require("../middleware/tokenValidation"));
const updateUserDataController_1 = __importDefault(require("../controllers/User/updateUserDataController"));
const uploadProfilePhoto_1 = __importDefault(require("../controllers/User/uploadProfilePhoto"));
const deleteProfilePhotoController_1 = __importDefault(require("../controllers/User/deleteProfilePhotoController"));
const user = express_1.default.Router();
user.get('/profile', tokenValidation_1.default, getUserProfileController_1.default);
user.put('/updatedata', tokenValidation_1.default, updateUserDataController_1.default);
user.put('/uploadphoto', tokenValidation_1.default, uploadProfilePhoto_1.default);
user.delete('/deletephoto', tokenValidation_1.default, deleteProfilePhotoController_1.default);
exports.default = user;
