/*
    발급받은 인증서가 있는 경우 createServer 첫 번째 인수에 인증서 관련 옵션 객체를 대입
*/

const https = require('https');
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello server!</p>');
})
    .listen(443, () => { // 실제 서버에서는 80포트 대신 443 포트를 사용
        console.log('443번 포트');
    });