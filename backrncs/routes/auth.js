const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res, next) => {
    try {
        const {nickname, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashed, nickname});
        const result = await user.save();
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post('/login',async (req,res,next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){ return res.status(401).json({error:"User already exists"}); }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){ return res.status(401).json({error:"password not match"}); }


        // payload 는 보이는 데이터 !password 입력 X!
        const token = jwt.sign({
            userId : user.id,
            nickname : user.nickname,
        },
            " secret",
            {expiresIn: "1h"}
        );

        res.json({token})
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;