/*
Content-Type': 'text/plain : text 날리기

 */
const pool = require('./db');
console.log(pool);

const http = require('http');
const fs = require('fs');

http.createServer( async (req, res) => {
    console.log(req.url);
    try {
        if(req.url === '/'){
            const password = '비밀번호';

            const indexhtml = await fs.readFileSync('./index.html',(err, data) => {
                if (err) throw err;
                return data;
            });

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end(indexhtml);
            // res.end('<html><body><h1>안녕</h1></body></html>\n');
        }
        else if(req.url.includes('/select')){
            const conn = await pool.getConnection();
            const sql = 'SELECT * FROM users';
            const [rows] = await conn.execute(sql);
            conn.release();
            console.log(rows);
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(rows[0])); // 결과를 json으로 변환하여 전송
        }
        else if(req.url === '/join' && req.method === 'POST'){
            // 한글이 들어오는 거 맞추기 위해서 utf-8 로 인코딩
            req.setEncoding('utf-8');

            // body 문자열 선언
            let body = '';
            // request 요청 한 클라인거 data 로 들어오는게 있으면
            // data 를 모아서 body 에 넣어준다
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', async () => {
            // body 내용 출력
                console.log(body);
                const {id,password} = JSON.parse(body);
                console.log(id,password);

                // mysql 에 저장하는 코드
                const conn = await pool.getConnection(); // pull 에서 connection 가져오는
                const sql = 'INSERT INTO users (id,password) VALUES (?,?)' // sql 구문 설정
                const [result] = await conn.execute(sql, [id,password]);
                conn.release(); // pool 반환

                console.log(result);

            })

            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
            return  res.end(JSON.stringify({message: '회원가입 성공'}));

        }else if(req.url === '/login'){

            // id pw -> mysql select 해당하는 행이 있으면 로그인 성공

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            return  res.end('로그인 성공');

        }

        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        return res.end('잘못된 경로입니다');


    }catch(e){
        console.error(e);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    }

}).listen(8080,'0.0.0.0', () => {
    console.log('Server started on port 8080');
});