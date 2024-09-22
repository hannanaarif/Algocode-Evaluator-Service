import express from "express";

const serverConfig=require('./config/serverConfig')

const app=express();
const PORT=serverConfig.PORT;

app.listen(PORT,()=>{
    console.log(`server started at *:${PORT}`);
})