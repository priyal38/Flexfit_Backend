import { Request, Response } from "express";
import * as apiResponse from "../../helper/apiResponse";
import BlogModel from "../../models/blogModel";
import { upload } from "../../helper/multerConfig";
import schemaValidator from "../../middleware/schemaValidator";



const addBlog = [
  upload.single('coverImg'),
  schemaValidator('/addblog') ,
  
async (req: Request, res: Response) => {

    const {
      title,
      content,
      author,
      category,
      readtime,
      subtitle
    } = req.body;
    try {
      const blog = await BlogModel.create({
        title,
        content:JSON.parse(content),
        author,
        category,
        coverImg: req.file?.path,
        readtime,
        subtitle
      });
      blog.save();

      if (blog) {
        return apiResponse.successResponse(res, "new blog added");
      }
    } catch (error) {
      console.log(error);
      apiResponse.errorResponse(res, " blog not added");
    }
  
  }
]

export default addBlog;  
