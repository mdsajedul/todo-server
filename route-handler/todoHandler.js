
const express = require('express');
const router = express.Router();
const Todo = require('../Model/todoModel');
const checkLogin = require('../middlewares/checkLogin');

// all todos routes

//GET all todos
router.get('/',checkLogin, async (req,res)=>{
     await Todo.find({status:'active'}).select({
         _id:0,
         date:0
     })
     .limit(2)
     .exec((err,data)=>{
        if(err){
            res.status(500).json({error:'There is an error'})
        }
        else{
            res.status(200).json({result:data,message:'Success'})
        }
     })
     
})

//Get todo by ID
router.get('/:id',async (req,res)=>{
    await Todo.find({_id:req.params.id})
    .then(data=>{
        res.status(200).json({result:data,message:'Success'})
    })
    .catch(err=>{
        res.status(500).json({error:'There is an error'})
    })
})

// POST todo 
router.post('/', async (req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({error:'There is an error'})
        }
        else{
            res.status(200).json({message:'New todo added successfully '})
        }
    })
})

router.post('/all', async (req,res)=>{
    await Todo.insertMany(req.body, (err)=>{
        if(err){
            res.status(500).json({error:"There is an server side error"});
        }
        else{
            res.status(200).json({message:"Todos are added successfully added"})
        }
    })
})

// PUT todo by id 
router.put('/:id', async (req,res)=>{
    const result =  await Todo.findByIdAndUpdate({_id: req.params.id},{
        $set:{
            status:'active'
        }
    })
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        if(err){
            res.status(500).json({error:"There is an server side error"});
        }
        else{
            res.status(200).json({message:"Todos are added successfully added"})
        }
    })

    console.log(result)
})

//DELETE todo 
router.delete('/:id', async (req, res)=>{
    await Todo.deleteOne({_id:req.params.id})
    .then(data=>{
        res.status(200).json({message:'Deleted Successfully'})
    })
    .catch(err=>{
        res.status(500).json({error:"There is an server side error"});
    })
})

module.exports = router;