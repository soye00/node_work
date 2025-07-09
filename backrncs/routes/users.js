const express = require('express');
const router = express.Router();
const User = require('../schemas/users');

router.post('/register',async (req,res, next)=>{
    try{
        const {email,password,nickname} = req.body;
        const user = new User({ email,password,nickname });
        const result = await user.save();
        return res.json(result);
    }catch(err){
        return res.status(500).json(err);
    }
});

router.get('/', async (req,res,next)=>{
    try{
        const users = await User.find();
        return res.json(users);
    }catch(err){
        return res.status(500).json(err);
    }
})







module.exports = router;

