<!-- 
    설치 모듈
    nodemon, express, morgan, cookie-parser, express-session, dotenv, multer
-->

# 6장 익스프레스 웹 서버 만들기
* npm 서버를 제작하는 과정에서의 불편함을 해소하고 편의 기능을 추가한 웹거버 프레임워크
* 익스프레스는 http 모듈의 요청과 응답 객체에 추가 기능들을 부여

## 6.1 익스프레스 프로젝트 시작하기
(/learn-express)
* scripts->start 속성은 필수 값
* 서버를 수정할때마다 매번 서버를 재시작하기는 귀찮으므로 nodemon 모듈로 서버를 자동 재시작
    - 콘솔에 rs를 입력해서 수동으로 재시작 가능
    - 개발용으로만 사용하는 것을 권장

## 6.2 자주 사용하는 미들웨어
* 미들웨어는 익스프레스의 핵심
* 미들웨어 : 요청과 응답의 중간(미들(middle))에 위치
* 미들웨어는 app.use(미들웨어)와 같이 사용
* next를 실행하지 않으면 다음 미들웨어가 실행되지 않음
* 주소를 첫 번째 인수로 넣지 않으면 미들웨어는 모든 요청에서 실행, 주소를 넣는 다면 해당하는 요청에서만 실행

|:---:|:---:|
|app.use(미들웨어)|모든 요청에서 미들웨어 실행|
|app.use('/abc', 미들웨어)|abc로 시작하는 요청에서 미들웨어 실행|
|app.post('/abc', 미들웨어)|abc로 시작하는 POST 요청에서 미들웨어 실행|

* morgan
morgan : 요청과 응답에 대한 정보를 콘솔에 기록
인수 : dev(개발환경), combined(배포 환경), common, short, tiny

* static
static : 정적인 파일들을 제공하는 라우터 역할
`app.use('요청 경로', express.static('실제 경로'));`
서버의 폴더 경로와 요청 경로가 다르므로 외부인이 서버의 구조를 쉽게 파악할 수 없으므로 보안에 큰 도움이 됨

* body-parser
요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
보통 폼데이터나 AJAX 요청의 데이터를 처리하지만 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못함

`````
app.use(exprss.json()); // JSON 형식의 데이터 전달 방식
app.use(express.urlencoded({ extended: false })); // 주소 형식으로 데이터를 보내는 방식, extended : true(qs npm 패키지) / false(querystring 모듈)
`````

body-parser 미들웨어의 일부 기능이 익스프레스에 내장되었으므로 따로 설치할 필요 없음
버퍼나 텍스트 요청을 처리할 필요가 있다면 body-parser 설치 후 다음과 같이 추가

`````
    npm i body-parser
    const bodyParser = require('body-parser');
    app.use(bodyParser.raw());
    app.use(bodyParser.text());
`````

* cookie-parser
요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듬(parsecookies 함수와 기능이 비슷)
`app.use(cookieParser(비밀키));`
비밀키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙임(req.cookies 대신 req.signedCookies 객체에 들어있음)
쿠키 생성 : res.cookie / 쿠키 제거 : res.clearCookie

`````
    res.cookie('name', 'zericho', {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
    });
    res.clearCookie('name', 'zerocho', { httpOnly: true, secure: true });
    // 쿠키를 지우려면 키, 값, 옵션이 정확히 일치해야 지워짐(단, expires나 maxAge 옵션은 일치할 필요 없음)
`````

* express-session
세션 관리용 미들웨어 / 데이터를 임시적으로 저장해둘 때 매우 유용
cookie-parser 미들웨어 뒤에 놓는 것이 안전
express-session에서 서명한 쿠키 앞에는 s:(s%3A)가 붙음

`````
    app.use(session({
        resave: false, // 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정
        saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true, // 클라이언트에서 쿠키를 확인 못하도록 설정
            secure: false, // https가 아닌 환경에서도 사용 가능(배포시에는 true로 설정하는 것이 좋음)
        },
        name: 'session-cookie',
        store // 데이터베이스를 연결하여 세션을 유지하는 것이 좋음(보통 REDIS를 사용)
    }))

    req.session.name = 'zerocho'; // 세션 등록
    req.sesisonID; // 세션 아이디 확인
    req.session.destroy(); // 세션 모두 제거
`````

* 미들웨어의 특성 활용하기
미들웨어는 req, res, next를 매개 변수로 가진 함수(에러 처리 미들웨어만 예외적으로 err, req, res, next를 가짐)
특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 됨
다음 미들웨어로 넘어가려면 next 함수를 호출해야 함
next를 내부적으로 호출하지 않는 미들웨어는 res.send나 res.sendFile 등의 메서드로 응답을 보내야 함
express.static과 같은 미들웨어는 정적 파일을 제공할 때 next 대신 res.sendFile 메서드로 응답을 보냄

`````
    app.use(
        morgan('dev'),
        express.static('/', path.join(__dirname, 'public')),
        express.json(),
        express.urlencoded({ extended: false }),
        cookieParser(process.env.COOKIE_SECRET),
    )

    next() // 다음 미들웨어로
    next('route') // 다음 라우터로
    next(error) // 에러 핸들러로

    /* 세션을 사용하면 세션이 유지되는 동안 데이터도 계속 유지되기 때문에 요청이 끝날때만 데이터를 유지하는 경우 req 객체에 데이터를 넣어둬야 함 */
    app.use((req, res, next) => {
        req.data = '데이터 넣기';
        next();
    }, (req, res, next) => {
        console.log(req.data); // 데이터 받기
    })
`````

* multer
이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어
enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식을 의미

`````
    const multer = require('multer');

    const upload = multer({
        storage: multer.diskStorage({ 
            destination(req, file, done){ // 어디에
                /*
                    done
                    첫 번째 인수 : 에러가 있다면 에러를 넣음
                    두 번째 인수 : 실제 경로나 파일 이름을 넣음
                */
                done(null, 'uploads/');
            },
            filename(req, file, done){ // 어떤 이름으로
                const ext = path.extname(file.originalname);
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // 업로드에 대한 제한 사항
    });
`````

위 설정을 사용하기 위해서는 서버에 uploads 폴더가 꼭 존재해야 함(없다면 직접 만들거나 fs 모듈을 사용하여 서버가 시작할 때 생성함)

`````
    const fs = require('fs');

    try{
        fs.readdirSync('uploads');
    } catch (err){
        console.error('uploads 폴더가 없어 uploads 폴더 생성');
        fs.mkdirSync('uploads');
    }
`````

파일을 하나만 업로드하는 경우 single 미들웨어를 사용

`````
    app.post('/upload', upload.single('image'), (req, res) => {
        console.log(req.file, req.body);
        res.send('ok');
    });
    /*
        single 미들웨어를 라우터 미들웨어 앞에 넣어두면, multer 설정에 따라 파일을 업로드 후 req.file 객체가 생성
        인수는 input 태그의 name이나 폼 데이터의 키와 일치하게 넣으면 됨
    */
`````

여러 파일을 업로드하는 경우 HTML의 input 태그에는 multiple을 쓰면 됨
미들웨어는 single 대신 array로 교체

`````
    app.post('/upload', upload.array('many'), (req, res) => {
        console.log(req.file, req.body);
        res.send('ok');
    });
`````

파일을 여러 개 업로드하지만 input 태그나 폼 데이터의 키가 다른 경우에는 fields 미들웨어를 사용

`````
    app.post('/upload',
        upload.fields([{ name: 'image1' }, { name: 'image2' }]),
        (req, res) => {
            console.log(req,files, req.body);
            res.send('ok');
        },
    );
`````

파일을 업로드 하지 않고도 멀티파트 형식으로 업로하는 경우 none 미들웨어를 사용

`````
    app.post('/upload', upload.none(), (req, res) => {
        console.log(req.body);
        res.send('ok');
    });
`````

## 6.3 Router 객체로 라우팅 분리하기
next('route')를 사용하여 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용

`````
    router.get('/', function(req, res, next) {
        next('route');
    }, function(req, res, next) {
        console.log('실행되지 않습니다');
        next();
    }, function(req, res, next) {
        console.log('실행되지 않습니다');
        next();
    });
    router.get('/', function(req, res){
        console.log('실행됩니다');
        res.send('Hello, Express');
    });
`````

라우트 매배변수 패턴
다양한 라우터를 아우루는 와일드카드 역할을 하므로 일반 라우터보다는 뒤에 위채해야 다른 라우터를 방해하지 않음

`````
    router.get('/user/:id', function(req, res){
        console.log(req.params, req,query);
        // req.params.id로 접근 가능
    });

    router.get('/user/:id', function(req, res) {
        console.log('얘만 실행됩니다.');
    });
    router.get('/user/like', function(req, res) {
        console.log('전혀 실행되지 않습니다.');
    });
`````

쿼리 스트링의 키-값 정보는 req.query 객체 안에 들어 있음

`````
/users/123?limit=5&skip=10  인 경우
req.params : { id: '123' }
req.query : { limit: '5', skip: '10' }
`````

## 6.4 req, res 객체 살펴보기
* req, res 객체의 메서드는 메서드 체이닝을 지원하는 경우가 많음

`````
ex) res
        .status(201)
        .cookie('test', 'test')
        .redirect('/admin');
`````

* req 객체

`````
    req.app: req 객체를 통해 app 객체에 접근할 수 있음
    req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
    req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체
    req.ip: 요청의 ip 주소가 담겨있음
    req.params: 라우트 매개변수에 대한 정보가 담긴 객체
    req.query: 쿼리스트링에 대한 정보가 담긴 객체
    req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담김
    req.get(헤더 이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드
`````

* res 객체

`````
    res.app: res.app처럼 res 객체를 통해 app 객체에 접근 가능
    res.cookie(키, 값, 옵션): 쿠키를 설정하는 메서드
    res.clearCookie(키, 값, 옵션): 쿠키를 제거하는 메서드
    res.end(): 데이터 없이 응답을 보냄
    res.json(JSON): JSON 형식의 응답을 보냄
    res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보냄
    res.render(뷰, 데이터): 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드
    res.send(데이터): 데이터와 함께 응답을 보냄(문자열, HTML, 버퍼, 객체, 배열일수 있음)
    res.sendFile(경로): 경로에 위치한 파일을 응답
    res.set(헤더, 값): 응답의 헤더를 설정
    res.status(코드): 응답 시의 HTTP 상태 코드를 지정
`````

## 6.5 템플릿 엔진 사용하기
* 템플릿 엔진은 자바스크립트를 사용해서 HTML을 렌더링할 수 있게 함

* 퍼그(제이드)
문법이 간단하므로 코드의 양이 줄어
`npm i pug`

* 넌적스
HTML 문법을 그대로 사용하되 추가로 js문법을 사용할 수 있음
`npm i nunjucks`

## 6.6 함께 보면 좋은 자료
[Express 공식 홈페이지](http://expressjs.com)
[퍼그 공식 홈페이지](https://pugjs.org)
[넌적스 공식 홈페이지](https://mozilla.github.io/nunjucks)
[morgan](https://github.com/expressjs/morgan)
[body-parser](https://github.com/expressjs/body-parser)
[cookie-parser](https://github.com/expressjs/cookie-parser)
[static](https://github.com/expressjs/serve-static)
[express-session](https://github.com/expressjs/session)
[multer](https://github.com/expressjs/multer)
[dotenv](https://github.com/motdotla/dotenv)