
const express = require('express');
const router = express.Router();
const Todo = require('../Model/todoModel');

// all todos routes

//GET all todos
router.get('/', async (req,res)=>{
     await Todo.find()
})

//Get todo by ID
router.get('/:id',async (req,res)=>{

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

})

module.exports = router;