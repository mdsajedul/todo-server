const express = require('express');
const router = express.Router();
const User = require('../Model/userModel');
const bcrypt = require('bcrypt');


router.post('/signup',async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name:req.body.name,
            username:req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({message:'Signup Successful'})
    }
    catch{
        res.status(500).json({error:'Signup was not successful'});
    }
})

router.post('/login', async(req,res)=>{
    const user = await User.find({username:req.body.username});
    if(user && user.length>0 ){
        const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);
        if(isValidPassword){
            res.send('Login Successful')
        }
        else{
            res.status(401).json({error:'Authentication failed'})
        }
    }
    else{
        res.status(401).json({error:'Authentication failed'})
    }
})


module.exports = router;