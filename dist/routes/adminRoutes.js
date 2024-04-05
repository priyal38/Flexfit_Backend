"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAdminCardDataController_1 = __importDefault(require("../controllers/admin/getAdminCardDataController"));
const tokenValidation_1 = __importDefault(require("../middleware/tokenValidation"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const admin = express_1.default.Router();
admin.get('/getallcarddata', tokenValidation_1.default, isAdmin_1.default, getAdminCardDataController_1.default);
exports.default = admin;
