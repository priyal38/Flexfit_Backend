"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signupController_1 = __importDefault(require("../controllers/Auth/signupController"));
const loginController_1 = __importDefault(require("../controllers/Auth/loginController"));
const forgotController_1 = __importDefault(require("../controllers/Auth/forgotController"));
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const refreshToken_1 = __importDefault(require("../controllers/Auth/refreshToken"));
const auth = express_1.default.Router();
auth.post("/signup", (0, schemaValidator_1.default)("/signup"), signupController_1.default);
auth.post("/login", (0, schemaValidator_1.default)('/login'), loginController_1.default);
auth.post("/forgot", (0, schemaValidator_1.default)('/forgot'), forgotController_1.default);
auth.get("/refresh", refreshToken_1.default);
exports.default = auth;
