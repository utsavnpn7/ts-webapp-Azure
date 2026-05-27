import express from "express";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import  { getConfigObject } from "./config.js";
const configList =await getConfigObject();
if(!configList.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in .env")
}
const app = express();
app.use(express.json());
// let list =getconfiglist();
app.set('view engine','ejs')

console.log( "configuration data :",configList)
app.get("/",(req,res)=>{
    const data={
        title: "My Express Page",
        message: "Hello! This page is from Server",
        items:["Apples","Banana", "Oranges"]
    }
    res.render('index',data);
})
// console.log(await list);
app.get("/health",(req,res)=>{
    res.json({
        healthStatus:"Healthy"
    })
})
const port = process.env.PORT || configList.PORT || 3000
app.listen(port,()=>{
    console.log(`App running on local port ${port}`)
})