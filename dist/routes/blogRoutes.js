"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addBlogController_1 = __importDefault(require("../controllers/Blog/addBlogController"));
const getAllBlogsController_1 = __importDefault(require("../controllers/Blog/getAllBlogsController"));
const getBlogByIdController_1 = __importDefault(require("../controllers/Blog/getBlogByIdController"));
const tokenValidation_1 = __importDefault(require("../middleware/tokenValidation"));
const updateBlogController_1 = __importDefault(require("../controllers/Blog/updateBlogController"));
const deleteBlogController_1 = __importDefault(require("../controllers/Blog/deleteBlogController"));
const blog = express_1.default.Router();
blog.post("/addblog", tokenValidation_1.default, addBlogController_1.default);
blog.get("/getblog", tokenValidation_1.default, getAllBlogsController_1.default);
blog.get("/getblog/:id", tokenValidation_1.default, getBlogByIdController_1.default);
blog.put('/updateblog/:id', tokenValidation_1.default, updateBlogController_1.default);
blog.delete('/deleteblog/:id', tokenValidation_1.default, deleteBlogController_1.default);
exports.default = blog;
