import mongoose, { Schema, Document } from "mongoose";


interface Workout extends Document {
    title:string,
    category:string,
    subCategory:string,
    explanation:string,
    difficultyLevel:string,
    equipment:string
    thumbnail:string,
    videoUrl:string
}
const workoutSchema = new mongoose.Schema<Workout>({
    
    title: { type: String, required:true  },
    category: { type: String ,required:true},
    subCategory: { type: String   },
    explanation: { type: String ,required:true},
    difficultyLevel: {type:String , required:true},
    thumbnail:{type:String , required:true},
    equipment:{type:String},
    videoUrl: { type: String  , required:true}
});

const WorkoutModel = mongoose.model<Workout>("Workout", workoutSchema);

export default  WorkoutModel;
