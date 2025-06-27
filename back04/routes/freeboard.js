const express = require('express');

const router = express.Router();


// 같은 주소일때 
router
.route("/")
.get((req,res,next)=>{
    console.log("freeboard Router Get 동작");
    res.send("freeboard Router Get");
})
.post((req,res,next)=>{
    console.log("freeboard Router Post 동작");
    res.end("freeboard Router Post")
})
.put((req,res,next)=> {
    console.log("freeboard Router Put 동작");
    res.end("freeboard Router Put")
});


module.exports = router;