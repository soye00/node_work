require('dotenv').config();

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST, // 주소
    user: process.env.DB_USER, // 사용자
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // 대기할지 여부
    connectionLimit: 10, // 최대 연결 수 : 10명의 동시사용 허용
    queueLimit: 0,  // 대기열 최대 수 작업지시 개수 : 무한대까지 연결가능
});

// try{
//     pool.getConnection((err, connection) => {
//         if(err){
//             console.error('DB connection error:', err);
//             return;
//         }
//         console.log('DB connected');
//         connection.release();
//     })
// }catch(e){
//     console.error(e);
// }


module.exports = pool;


