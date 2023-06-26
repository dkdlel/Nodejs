/*
    쿠키에는 대표적으로 한글, 줄바꿈은 들어가면 안됨
*/

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

/*
    쿠키 스트링 값을 쉽게 사용하기 위해 js 객체 형식으로 바꾸는 함수
*/
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url); // querystring 모듈로 각각 주소와 주소에 딸려오는 query를 분석
        const { name } = qs.parse(query);
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        // 한글 사용을 위해 encodeURIComponent 사용
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; path=/`,
        });
        res.end();
    } else if (cookies.name) { // name이라는 쿠키가 있는 경우
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중입니다!');
    });