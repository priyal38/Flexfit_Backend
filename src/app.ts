
import express from 'express';
import {json} from "body-parser";
import cors from "cors";
// import dotenv from "dotenv";
import connection from './db';
import indexroute from './routes/index'
import cookieparser from "cookie-parser";
  
 
connection();
 
const app = express();

app.use(json());
app.use(cors(
    {
        origin:["https://flexfit-fitness.vercel.app" , "http://localhost:3000"],
        credentials:true
    }
)); 
app.use(cookieparser());
app.use('/uploads' , express.static('./uploads'))


app.use('/', indexroute)
const PORT = 5000;

 
app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})