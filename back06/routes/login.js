var express = require('express');
var router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/logout', function (req, res, next) {
    req.session.destroy(()=>{
        console.log('로그아웃 되었습니다.');
        res.clearCookie('session-cookie')
        res.redirect('/');

    });
})


router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/', async function(req, res, next) {
    console.log(req.body);
    const {phone, password, endpoint, p256dh, auth} = req.body;

    console.log(endpoint, p256dh, auth);
    // console.log(phone, password);

    const {data, error} = await supabase.from('cleaner')
        .select('*')
        .eq('phone', phone)
        .single();

    console.log(data);
    console.log(error);

    if(data) {
        // 로그인 성공시 req.session.user 에 내용 넣어줌
        // 세션 만들고 '/' 페이지로 이동
        req.session.user = data;
        res.redirect('/')
    }else {
        // login 페이지로 가면서 error 가지고 이동
        res.render('login', {error : "핸드폰 번호와 비밀번호 확인하세요"});
    }

})


module.exports = router;