import express from "express"
import addBlogController from "../controllers/Blog/addBlogController";
import getAllBlogs from "../controllers/Blog/getAllBlogsController";
import getBlogById from "../controllers/Blog/getBlogByIdController";

import verifyToken from "../middleware/tokenValidation";
import updateBlog from "../controllers/Blog/updateBlogController";
import deleteBlog from "../controllers/Blog/deleteBlogController";



const blog = express.Router();
blog.post("/addblog" , verifyToken,addBlogController )
blog.get("/getblog",verifyToken ,getAllBlogs )
blog.get("/getblog/:id",verifyToken ,getBlogById )
blog.put('/updateblog/:id', verifyToken , updateBlog);
blog.delete('/deleteblog/:id', verifyToken , deleteBlog);


export default blog;