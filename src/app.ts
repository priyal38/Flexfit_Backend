
import express from 'express';
import {json} from "body-parser";
import cors from "cors";
// import dotenv from "dotenv";
import connection from './db';
import indexroute from './routes/index'
import cookieparser from "cookie-parser";
import axios from 'axios';
 
connection();
 
const app = express();

app.use(json());
app.use(cors(
    {
        origin:["https://flexfit--fitness.vercel.app" , "https://flexfit-fitness.vercel.app" , "http://localhost:3000" , "https://flex-fit-frontend-pwa-main.vercel.app" , "https://flexfit-uat-fitness.vercel.app"],
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

const keepAliveUrl = 'https://flexfit-backend.onrender.com'; // 🔁 replace with your actual Render URL
const pingInterval = 5 * 60 * 1000; // every 5 minutes
function keepRenderAppAlive(): void {
    axios
      .get(keepAliveUrl)
      .then((response :any) => {
        console.log(`[Keep-Alive] Pinged Render: ${response.status} at ${new Date().toISOString()}`);
      })
      .catch((error :any) => {
        console.error(`[Keep-Alive] Ping Error at ${new Date().toISOString()}:`, error.message);
      });
  }
  
  setInterval(keepRenderAppAlive, pingInterval);
