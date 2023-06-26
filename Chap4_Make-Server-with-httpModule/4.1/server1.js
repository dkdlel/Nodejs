/*
    createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수를 넣음
    res 객체
    1)res.writeHead : 응답에 대한 정보를 기록하는 메서드, 이 정보가 기록되는 부분을 헤더(Header)라고 함
                        - 첫 번째 인수 : HTTP 상태코드(성공의 의미로 200을 보냄)
                        - 두 번째 인수 : 응답에 대한 정보를 보냄(콘텐츠 형식이 HTML임을 알림)
    2)res.write : 데이터가 기록되는 부분을 본문(Body)라고 부름
                - 첫 번째 인수 : 클라이언트로 보낼 데이터(HTML 문자열, 버퍼 / 여러번 호출 가능)
    3)res.end : 응답을 종료하는 메서드, 인수가 있다면 그 데이터도 보낸 뒤 응답을 종료
*/

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => { // 서버 연결
        console.log('waiting in 8080 port');
    });