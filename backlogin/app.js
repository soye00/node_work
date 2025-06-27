const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const axios = require('axios');
const supabase = require('./database/db');
require('dotenv').config();

const port = process.env.PORT || 4003;
const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', // 프론트엔드 주소
        credentials: true,
    }
));

app.use(express.json()); // JSON 형식의 요청 본문을 파싱하기 위한 미들웨어
app.use(express.urlencoded({extended: true})); // URL 인코딩된 요청 본문을 파싱하기 위한 미들웨어
app.use('/', express.static('public'));
app.use(cookieParser('keyboard cat')); // 쿠키를 파싱하기 위한 미들웨어
app.use(expressSession({
    secret: 'keyboard cat', // 세션을 암호화하기 위한 비밀 키
    resave: false, // 세션이 변경되지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {httpOnly: true, secure: false}
}));

app.use('/api', require('./routes/api'));

app.get('/oauth/login', async (req, res) => {
    const {code} = req.query;
    try {
        const tokenRes = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirect_uri: process.env.KAKAO_REDIRECT_URI,
                    code,
                    client_secret: process.env.KAKAO_CLIENT_SECRET,
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me',{
            headers: { Authorization : `Bearer ${tokenRes.data.access_token}` }
        })
        const {nickname,profile_image,thumbnail_image} = userRes.data.properties;
        const email = userRes.data.kakao_account.email;

        console.log(nickname);
        console.log(email);
        console.log(profile_image);
        console.log(thumbnail_image);

        // supabase.from('member').insert([{
        // }]);

        req.session.user = {
            nickname,
            id: email,
            addr:"대구 달서ㄱ",
            profile_image,
            thumbnail_image,
        };
        res.redirect('http://localhost:5173/login/success');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
