const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const { parse } = require('path');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now(); // 쿠키에 이름을 담아서 보내는 대신 숫자값을 보냄
        session[uniqueInt] = {
            name,
            expires,
        };
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        // 세션 쿠키가 존재하고, 만료기간이 지나지 않았다면
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8 ' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080 포트');
    })