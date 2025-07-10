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

router.delete('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params; // const id = req.params.id;
        const deleted = await User.findByIdAndDelete(id);
        return res.json(deleted);
    }catch (err){
        return res.status(500).json(err);
    }

})

router.put('/:id',async (req,res,next)=>{
    try {
        const {id} = req.params;
        const {nickname, email, password} = req.body;

        const updated = await User.findByIdAndUpdate(
            id,
            {nickname, email, password},
            {new : true, runValidators: true}
        )
        if(!updated){
            return res.status(404).json({message:"사용자를 찾을 수 없습니다."});
        }
        return res.json(updated);
    }catch(err){
        
    }
})






module.exports = router;

