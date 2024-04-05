"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: [String], required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    coverImg: { type: String, required: true },
    readtime: { type: Number, required: true }
});
const BlogModel = mongoose_1.default.model("Blog", blogSchema);
exports.default = BlogModel;
