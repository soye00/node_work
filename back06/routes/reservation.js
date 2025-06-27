const express = require('express');
const router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/', async function(req, res, next) {
  console.log('주소호출');
  const {data:payData,error} = 
      await supabase
          .from('ice_res')
          .select()
          .in('status',['결제대기','결제완료']);

  const {data:cleanData} =
      await supabase
          .from('ice_res')
          .select()
          .in('status',['청소대기','청소진행','청소완료']);

  res.render('reservation',{payData,cleanData});
})

router.post('/', async function(req, res, next) {
  console.log(req.body);
  const {name,tel,email,addr,date,time,model,capacity,service,remark} = req.body;

  const result = await supabase.from('ice_res').insert({
    name,
    tel,
    email,
    addr,
    date:new Date(date),
    time,
    model,
    capacity,
    service,
    remark,
    payment_amount:10000,

  });

  console.log(result);



  res.send('success');
})

module.exports = router;