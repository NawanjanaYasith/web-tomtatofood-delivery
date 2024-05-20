import mongoose from 'mongoose';

 export const connectDB=async ()=> {
    await mongoose.connect('mongodb+srv://ymart:19991014@cluster0.lbhvruu.mongodb.net/food-del');
}

