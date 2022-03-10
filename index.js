const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./route-handler/todoHandler');
const userHandler = require('./route-handler/userHandler');

const app = express();
app.use(express.json());

// database connection 
mongoose
    .connect("mongodb://localhost/todos")
    .then(()=> console.log('Database connection successfull'))
    .catch((err)=>console.log(err));



// routes

app.use('/todo',todoHandler);

app.use('/user',userHandler);


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