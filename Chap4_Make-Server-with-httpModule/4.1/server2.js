/*
    HTML 파일을 미리 만들어 두고, fs 모듈로 읽어서 전송 가능

    HTTP 상태코드
    1) 2XX : 성공을 알리는 상태 코드
    2) 3XX : 리다이렉션을 알리는 상태 코드
    3) 4XX : 요청 오류
    4) 5XX : 서버 오류
*/

const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중입니다!');
    });