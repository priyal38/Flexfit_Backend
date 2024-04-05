import { Request, Response } from "express";
import BlogModel from "../../models/blogModel";
import * as apiResponse from "../../helper/apiResponse";

const deleteBlog = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const deletedBlog= await BlogModel.findByIdAndDelete(id);
        if (!deletedBlog) {
            return apiResponse.notFoundResponse(res, "Blog not found");
        }
        apiResponse.successResponse(res, "Blog deleted successfully");
    } catch (error) {
        console.log(error)
        return apiResponse.errorResponseWithData(res, "Error in updating Blog", error);
    }

}

export default deleteBlog