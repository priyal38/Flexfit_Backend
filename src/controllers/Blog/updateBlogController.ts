import { Request, Response } from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";
import { upload } from "../../helper/multerConfig";

const updateBlog= [

    upload.single('coverImg'),

    async (req: Request, res: Response) => {
        try {
          
            const id = req.params.id;
            const {
                title,
                content,
                author,
                category,
                readtime,
                subtitle
              } = req.body;
    
           
            const blog = await BlogModel.findByIdAndUpdate(id , {
                title,
                content:JSON.parse(content),
                author,
                category,
                coverImg: req.file?.path,
                readtime,
                subtitle
            } , {new:true} );

            if (!blog) {
                return apiResponse.notFoundResponse(res, "Blog not found");
            }
    
           
        
            await blog.save();
    
            apiResponse.successResponseWithData(res, "Blog updated successfully", blog);
        } catch (err) {
            console.log(err)
            return apiResponse.errorResponseWithData(res, "Error in updating Blog", err);
        }
    }
    

]
export default updateBlog;
