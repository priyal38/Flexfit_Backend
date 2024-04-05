import { Request , Response } from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";

const getBlogById = async(req:Request , res:Response) =>{

    const id = req.params.id;
    try{
        const blog = await BlogModel.findById(id);
          if(blog){
            apiResponse.successResponseWithData(res , "blog found" , blog)
          }
          
            else {
               
                return apiResponse.notFoundResponse(res, "blog not found");
            }
          }
    catch(err){
        return apiResponse.errorResponseWithData(res,"Error in getting blog",err)

    }
}

export default getBlogById