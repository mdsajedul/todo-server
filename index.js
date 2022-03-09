const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());




// port for server 
const port = process.env.PORT || 3000;


// default error handler function 
const defultErrorHandler =(err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error:err})
}

app.listen(port,()=>{
    console.log(`Todo Server is running on PORT ${port}`);
})