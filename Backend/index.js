import express from 'express';
import cors from 'cors';
import {connectDB} from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";


//app config
const app=express();
const port=4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB()
    .then(() => {
        console.log("DB connected")
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Optionally exit the process if the database connection fails
    });

//api endpoints
app.use("/api/food",foodRouter);
app.use("/image",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)

app.get("/get",(req,res)=>{
    res.send("API is working")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

