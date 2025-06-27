const express = require('express');
const router = express.Router();

router.post('/login', async (req,res,next)=>{
    console.log(req.body);
    const {id} = req.body;

    const sendData = {};

    if( id === 'admin' ){
        sendData.msg = 'success';
        res.json(sendData)
    }else {
        sendData.msg = 'failed';
        res.send(sendData);
    }
})



module.exports = router;