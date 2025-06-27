// 양방향 => 암호화 O 복호화 O
// 단방향 -> 암호화 O sha512 방식으로

// 단방향 암호화 = 해시

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    if(err){
        console.log(err)
        return;
    }

    // console.log(buf);
    // console.log(buf.toString());
    const key = buf.toString('base64');
    console.log('key',key);
    crypto.pbkdf2('password', key, 100000, 64, 'sha512', (err, derivedKey) => {
        console.log('password', derivedKey, toString('base64'));
    });

});