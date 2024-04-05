import express from "express";
import getAdminCardData from "../controllers/admin/getAdminCardDataController";
import verifyToken from "../middleware/tokenValidation";
import isAdmin from "../middleware/isAdmin";


const admin = express.Router();

admin.get('/getallcarddata' ,verifyToken ,isAdmin, getAdminCardData)

export default admin