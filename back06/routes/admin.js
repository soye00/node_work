var express = require('express');
var router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/', async function(req, res, next) {
  const {data} = await supabase.from('cleaner').select();
  res.render('admin',{cleaners:data});

});

router.post('/', async function(req, res, next) {
  // console.log('post 로 저장할 계획');
  // console.log(req.body);
  const { name, email, phone, addr,} = req.body;

  const {error} = await supabase.from('cleaner')
      .insert({name, email, phone,"address":addr});

  if(error) {
    console.log('슈퍼베이스 등록 에러 발생');
    console.log(error);
  }

  const {data} = await supabase.from('cleaner').select();

  // res.render('admin', {cleaners:data});
  res.redirect('/admin');
})

module.exports = router;
