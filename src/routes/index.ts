import express from "express";
import workoutRoute from './workoutRoutes'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import blogRoutes from "./blogRoutes"
import recipeRoutes from "./recipeRoutes";
import progressRoutes from './progresstrackRoutes'
import adminRoutes from './adminRoutes'

const app = express();

app.use("/workout", workoutRoute);
app.use("/auth",authRoutes)
app.use("/user" , userRoutes)
app.use("/blog" , blogRoutes)
app.use("/recipe" , recipeRoutes)
app.use("/progress" , progressRoutes)
app.use("/admin" , adminRoutes)


export default app;