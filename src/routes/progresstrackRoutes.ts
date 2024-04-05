import express from "express"


import getWorkoutDataByDate from "../controllers/ProgressTrack/getTableDataByDate";
import updateCompletionStatus from "../controllers/ProgressTrack/updateCompletionStatus";
import verifyToken from "../middleware/tokenValidation";
import addUserWorkout from "../controllers/ProgressTrack/addUserWorkoutController";
import getChartDataByDate from "../controllers/ProgressTrack/getChartDataController";
import updateTabledata from "../controllers/ProgressTrack/updateTableDataController";
import deleteTableData from "../controllers/ProgressTrack/deleteWorkoutController";
import getAllDataByUserid from "../controllers/ProgressTrack/getAllDataByuserIdController";




const progress = express.Router();

progress.get("/gettabledata",verifyToken, getWorkoutDataByDate )
progress.get("/getchartdata",verifyToken, getChartDataByDate )
progress.get("/getcarddata",verifyToken, getAllDataByUserid )
progress.post("/adduserworkout" , verifyToken , addUserWorkout)
progress.put("/updateCompletionStatus" , verifyToken, updateCompletionStatus)
progress.put("/updatetabledata/:id" , verifyToken , updateTabledata)
progress.delete("/deletetabledata/:id" , verifyToken ,deleteTableData)


export default progress;