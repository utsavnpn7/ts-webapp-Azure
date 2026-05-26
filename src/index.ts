import express from "express";
import dotenv from 'dotenv'
dotenv.config();
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in .env")
}
const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({
        healthStatus:"Healthy"
    })
})
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`App running on local port ${port}`)
})