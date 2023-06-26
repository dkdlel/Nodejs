# 4장 http 모듈로 서버 만들기

## 4.1 요청과 응답 이해하기
(createServer.js / server1.js / server1-1.js / server1-1.js / server2.js)
* 서버는 클라이언트가 있기에 동작
* 클라이언트에서 서버로 요청을 보내고 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에 응답을 보냄

## 4.2 REST와 라우팅 사용하기
(restServer.js)
* REST(REpresentational State Transfer) : 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킴
`````
    GET : 서버 자원을 가져오고자 할 때 사용(요청 본문에 데이터를 넣지 않고 쿼리스트링을 통해 보냄)
    POST : 서버에 자원을 새로 등록하고자 할 때 사용(요청의 본문에 새로 등록할 데이터를 넣어 보냄)
    PUT : 서버의 자원을 요청에 들어있는 자원으로 치환하고자 할 때 사용
    PATCH : 서버 자원의 일부만 수정하고자 할 때 사용
    DELETE : 서버의 자원을 삭제하고자 할 때 사용
    OPTIONS : 요청을 하기 전에 통신 옵션을 설명하기 위해 사용
`````

* REST에 기반한 서버 주소 구조 예시
|HTTP 메서드|주소|역할|
|:---:|:---:|:---:|
|GET|/|restFront.html 파일 제공|
|GET|/about|about.html 파일 제공|
|GET|/users|사용자 목록 제공|
|GET|기타|기타 정적 파일 제공|
|POST|/user|사용자 등록|
|PUT|/user/사용자id|해당 id의 사용자 수정|
|DELETE|/user/사용자id|해당 id으 사용자 제거|

## 4.3 쿠키와 세션 이해하기
(cookie.js / cookie2.js / session.js)
* 쿠키는 유효 기간이 있으며 '키-값'의 쌍임
* 서버로부터 쿠키가 오면 웹 브라우저는 쿠키를 저장해두었다가 다음에 요청할 때마다 쿠키를 동봉해서 보냄
* 브라우저는 쿠키가 있다면 자동으로 동봉해서 보내주므로 따로 처리할 필요 없음
* 쿠키는 요청의 헤더(Cookie)에 담겨서 전송 / 브라우저는 응답의 헤더(Set-Cookid)에 따라 쿠키를 저장
`````
    쿠키명=쿠키값 : 기본적인 쿠키의 값
    Expires=날짜 : 만료 기한 / 기본값은 클라이언트가 종료될 때 까지
    Max-age=초 : Expires와 비슷하지만 날짜 대신 초를 입력 / Expires보다 우선
    Domain=도메인명 : 쿠키가 전송될 도메인을 특정 / 기본값 : 현재 도메인
    Path=URL : 쿠키가 전송될 URL을 특정할 수 있음 / 기본값 : '/'
    Secure : HTTPS일 경우에만 쿠키가 전송
    HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없음 / 쿠키 조작 방지를 위해 설정하는 것이 좋음
`````

* 세션 : 서버에 사용자 정보를 저장하고 클라이언트와 세션 아이디로만 소통
* 위와 같은 방법처럼 하는 경우 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화 되고, 서버의 메모리가 부족하면 저장하지 못하는 문제 때문에 세션을 변수에 저장안함 => Redis, Memcached 같은 DB에 넣어둠

## 4.4 https와 http2
(server1-3.js / server1-4.js)
* https 모듈은 웹 서버에 SSL 암호화를 추가
* GET, POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없게 함
* http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 함

## 4.5 cluster
(cluster.js)
* 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
* 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있으므로, 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 가능(서버에 무리가 덜 감)
`````
장점 : 코어를 하나만 사용할 떄에 비해 성능이 개선됨
단점 : 메모리를 공유하지 못함
`````

* 마스터 프로세스는 CPU 개수 만큼 워커 프로세스를 만들고, 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배
* 실무에서는 pm2등의 모듈로 cluster기능을 사용하곤 함

## 4.6 함께 보면 좋은 자료
[http 모듈 소개](https://nodejs.org/dist/latest-v14.x/docs/api/http.html)
[쿠키 설명](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
[세션 설명](https://developer.mozilla.org/ko/docs/Web/HTTP/Session)
[https 모듈 소개](https://nodejs.org/dist/latest-v14.x/docs/api/https.html)
[http2 모듈 소개](https://nodejs.org/dist/latest-v14.x/docs/api/http2.html)
[cluster 모듈 소개](https://nodejs.org/dist/latest-v14.x/docs/api/cluster.html)