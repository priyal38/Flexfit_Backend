"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    profilePhoto: { type: String },
    height: { type: Number },
    role: { type: Number, default: 0 },
    weight: { type: Number },
    bio: { type: String }
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
