# 3장 노드 기능 알아보기

## 3.1 REPL 사용하기
* 읽고(Read), 해석하고(Eval), 결과물을 반환하고(Print), 종료할 때까지 반복(Loop)
* 터미널에서 `node` 입력하면 자바스크립트 코드 사용 가능

## 3.2 JS 파일 실행하기
* 파일 생성 후 콘솔에서 node [자바스크립트 파일 경로(확장자 생략)]

## 3.3 모듈로 만들기
* 모듈이란?     
`특정한 기능을 하는 함수나 변수들의 집합`     
하나의 프로그램이면서 다른 프로그램의 부품으로도 사용 가능(재사용 가능)     
3.3(index.js / func.js / var.js)

## 3.4 노드 내장 객체 알아보기
* global
브라우저의 window와 같은 전역 객체     
모든 파일에서 접근 가능     
3.4(globalA.js / globalB.js)

* console
time(레이블) : timeEnd와 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정     
log(내용) : 평범한 로그를 콘솔에 표시     
error(에러 내용) : 에러를 콘솔에 표시     
table(배열) : 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현     
dir(객체, 옵션) : 객체를 콘솔에 표시할 때 사용 / 첫 번째 인수 : 표시할 객체, 두 분째 인수 : 옵션(true: 콘솔에 색이 추가 됨)     
trace(레이블) : 에러가 어디서 발생 했는지 추적할 수 있게 함     
3.4(console.js)

* __filename, __dirname
현재 파일명(__filename)과 현재 파일 경로(__dirname)     
3.4(filename.js)

* module, exports, require
module.exports === exports     
require     
-require는 함수이고, 함수는 객체이므로 객체로서 몇 가지 속성을 가지고 있음     
-require가 반드시 파일 최상단에 위치할 필요가 없고, moodule.exports도 최하단에 위치할 필요가 없음     
require.cache     
-파일 이름이 속성명으로 들어 있음 / 속성값으로난 각 파일의 모듈 객체가 들어 있음     
-한번 require한 파일은 cache에 저장되어서 새로 불러오지 않고 cache에 있는 것이 재사용     
-새로 require하길 원한다면 cache의 속성을 제거(프로그램 동작이 꼬일 수 있으므로 권장하지는 않음)     
require.main     
-노드 실행 시 첫 모듈을 가리킴     
-객체 모양은 cache의 모듈 객체와 같음     
-`순환참조`가 발생하는 경우 순환 참조되는 대상을 빈 객체로 만듬

* process
`현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있음`     
`````
    process.version : 설치되 노드의 버전
    process.arch : 프로세서 아키텍처 정보
    processs.platform : OS 플랫폼 정보(linux, darwin, freebsd 등)
    process.pid : 현재 프로세스의 아이디
    process.uptime() : 프로세스가 시작된 후 흐른 시간(단위: 초)
    process.execPath : 노드의 경로
    process.cwd() : 현재 프로세스가 실행되는 위치
    process.cpuUsage() : 현재 cpu 사용량
`````
     
process.env     
시스템의 환경 변수     
노드에 직접 영향을 미치기도 함     
서비스의 중요한 키를 저장하는 공간으로도 사용     
      
process.nextTick(콜백)     
이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리     
마이크로태스트(microtask)라고 따로 구분지어 부름     
     
process.exit(코드)     
실행 중인 노드 프로세스를 종료
     
## 3.5 노드 내장 모듈 사용하기
`공식 문서에 모두 나와 있는 내용이지만 중요하고 자주 사용하는 것들만 소개`

* os
노드는 os모듈에 정보가 담겨 있어 정보를 가져올 수 있음    
3.5(os.js)
`````
    os.arch() : 프로세서 아키텍처 정보
    os.platform() : OS 플랫폼 정보(linux, darwin, freebsd 등)
    os.type() : 운영체제의 종류
    os.uptime() : 부팅 이후 흐린 시간(초)
    os.hostname() : 컴퓨터의 이름
    os.release() : 운영체제의 버전
    os.homedir() : 홈 디렉터리 경로
    os.tmpdir() : 임시 파일 저장 경로
    os.cpus() : 컴퓨터의 코어 정보
    os.freemem() : 사용 가느한 메모리(RAM)
    os.totalmem() : 전체 메모리 용량
`````
* path
`os별로 경로 구분자가 다르기 때문에 필요`     
폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈     
3.5(path.js)
`````
    path.sep : 경로의 구분자
    path.delimiter : 환경 병수의 구분자
    path.dirname(경로) : 파일이 위치한 폴더 경로
    path.extname(경로) : 파일의 확장자
    path.basename(경로, 확장자) : 파일의 이름(확장자 포함) / 확장자 변수를 넣을 경우 파일의 이름만 나옴
    path.parse(경로) : 파일의 경로를 root, dir, base, ext, name으로 분리
    path.format(객체) : path.parse()한 객체를 파일 경로로 합침
    path.normalize(경로) : /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환
    path.isAbsolute(경로) : 파일의 경로가 절대경로인지 상대경로인지
    path.relative(기준경로, 비교경로) : 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알림
    path.join(경로, ...) : 여러 인수를 하나의 경로를 합침
    path.resolve(경로, ...) : path.join()과 비슷함
    path.join('/a', '/b', 'c') -> /a/b/c/
    path.resolve('/a', '/b', 'c') -> /b/c
`````
* url
인터넷 주소를 쉽게 조작하도록 도와주는 모듈     
url.parse(주소): 주소를 분해 / WHATWG 방식과 비교하면 username, password 대신 auth 속성이 있고, searchParams 대신 query가 있음     
url.format(객체): WHATWG 방식 url과 기존 노드의 url을 모두 사용할 수 있음 / 분해되었던 url 객체를 다시 원래 상태로 조립     
<img src="./WHATWG.png" alt="WHATWG" width="100%"/>
3.5(url.js, searchParams.js)     
`````
    getAll(키) : 키에 해당하는 모든 값들을 가져옴
    get(키) : 키에 해당하는 첫 번째 값
    has(키) : 해당 키가 있는지 없는지를 검사
    keys() : searchParams의 모든 키를 반복기 객체로 가져옴
    values() : searchParams의 모든 값을 반복기 객체로 가져 옴
    append(키, 값) : 해당 키를 추가(키가 있다면 하나 더 추가)
    set(키, 값) : 같은 키의 값들을 모두 지우고 새로 추가
    delete(키) : 해당 키를 제거
    toString() : 조작한 searchParams 객체를 다시 문자열로 만듬
`````

* 3.5 querystring
WHATWG 방식의 url 대신 기존 노드의 url을 사용할 떄, search 부분을 사용하기 쉽게 객체로 만드는 모듈     
(querystring.js)

* crypto
단방향 암호화
복호화할 수 없는 암호화 방식
3.5.5.1(hash.js / pbkdf2.js)
`````
    createHash(알고리즘) : 사용할 해시 알고리즘
      - md5(취약점 발견), sha1(취약점 발견), sha256, sha512
    update(문자열) : 변환할 문자열을 넣음
    digest(인코딩) : 인코딩할 알고리즘을 넣음
`````

양방향 암호화
암호화된 문자열을 복호화할 수 있으며 키 값을 사용
3.5.5.2(cipher.js)
`````
    crypto.createCipheriv(알고리즘, 키, iv) : 암호화 알고리즘, 키, iv
      (사용 가능한 알고리즘 목록 : crypto.getCiphers())
    cripher.final(출력 인코딩) : 출력 결과물의 인코딩을 넣으면 암호화 완료
    crypto.createDecipheriv(알고리즘, 키, iv) : 복호화할 때 사용 / 암호화할 때 사용한 알고리즘, 키, iv를 그대로 사용
    decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩
    decipher.final(출력 인코딩) : 복호화 결과물의 인코딩을 넣음
`````

* util
util.js
`````
    util.deprecate : 함수가 deprecated 처리되었음을 알림
    util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿈(util.callbackify도 있지만 자주 사용되지는 않음)
`````

* 3.5.7 worker_threads
(worker_thread.js / worker_data.js)
(prime.js / prime-workes.js)

* 3.5.8 child_process
노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈
(exec.js / spawn.js)

* 3.5.9 기타 모듈들
`````
    assert : 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는 데 사용
    dns : 도메인 이름에 대한 IP 주소를 얻어내는 데 사용
    net : HTTP보다 로우 레벨인 TCP나 ICP 통신을 할 때 사용
    string_decorder : 버퍼 데이터를 문자열로 바꾸는데 사용
    tls : TLS와 SSL에 관련된 작업을 할 때 사용
    tty : 터미널과 관련된 작업을 할 때 사용
    dgram : UDP와 관련된 작업을 할 때 사용
    v8 : V8 엔진에 직접 접근할 때 사용
    vm : 가상 머신에 직접 접근할 때 사용
`````

## 3.6 파일 시스템 접근하기
* 3.6 fs 모듈
파일 시스템에 접근하는 모듈(파일 생성, 삭제, 읽기, 쓰기)
fs는 기본적으로 콜백 형식의 모듈이므로 실무에서 사용하기 불편함. 따라서 프로미스 형식으로 바꿔주는 방법을 사용
(readFile.js / readFilePromis.js / writefile.js)

* 3.6.1 동기 메서드와 비동기 메서드
(async.js / sync.js / asyncOrder.js)
동기와 비동기 : 백그라운드 작업 완료 확인 여부
블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부

* 3.6.2 버퍼와 스트림 이해하기
data.toString()으로 변환하는 이유 : data가 버퍼이기 때문에
파일을 읽거나 쓰는 방식은 `버퍼를 이용`하는 방식과 `스트림을 이용`하는 방식이 있음
(buffer.js / createReadStream.js / createWriteStream.js / pipe.js / gzip.js / createBigFile.js / buffer-memory.js / stream-memory.js)
Buffer 메서드
`````
    from(문자열) : 문자열을 버퍼로 바꿀 수 있음 / length 속성은 버퍼의 크기를 알림(바이트 단위)
    toString(버퍼) : 버퍼를 다시 문자열로 변경 / base64, hex를 인수로 넣으면 인코딩으로 변환 가능
    concat(배열) : 배열 안에 든 버퍼들을 하나로 합침
    alloc(바이트) : 바이트의 인수 크기많큼 빈 버퍼를 생성
`````

createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수 있음
파일 복사와 비슷
스트림끼리 연결하는 것을 '파이핑한다'고 표현

* 3.6.3 기타 fs 메서드 알아보기
fs는 파일 시스템을 조작하는 다양한 메서드를 제공(읽기, 쓰기, 생성, 삭제, 폴더 생성 및 삭제)
(fsCreate.js / fsDelete.js / copyFile.js / watch.js)
fs 메서드
`````
    fs.accesss(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지를 체크
    - 옵션(constants의 상수) : F_OK(파일 존재 여부), R_OK(읽기 권한 여부), W_OK(쓰기 권한 여부)
    - 파일/폴더나 권한이 없다면 ENOENT 에러 코드로 에러가 발생
    fs.mkdir(경로, 콜백) : 폴더를 만드는 메서드
    - 이미 폴더가 있다면 에러 발생
    fs.open(경로, 옵션, 콜백) : 파일의 아이디(fd 변수)를 가져오는 메서드
    - 파일이 없다면 파일을 생성한 뒤 아이디를 가져움
    - 가져온 아이디 값을 사용하여 fs.read나 fs.write로 읽고 쓰기 가능
    - 옵션(어떠한 동작을 할 것인지) : w(쓰기), r(읽기), a(기존 파일에 추가)
    fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드
    fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인(배열 안에 내부 파일과 폴더명이 나옴)
    fs.unlink(경로, 콜백) : 파일을 지울 수 있음
    - 파일이 없다면 에러 발생
    fs.rmdir(경로, 콜백) : 폴더를 지울 수 있음
    - 폴더 안에 파일들이 있다면 에러가 발생
    fs.copyFile(복사할 파일, 복사될 경로, 콜백) : 파일을 복사
    fs.watch(경로, 콜백) : 파일/폴더의 변경사항을 감지
`````

* 3.6.4 스레드풀 알아보기
스레드풀이 있기 때문에 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리됨
fs 외에도 내부적으로 스레드풀을 사용하는 모듈 : crypto, zlib, dns.looup등이 있음
(threadpool.js)

## 3.7 이벤트 이해하기
events 모듈을 사용, myEvent라는 객체를 먼저 만듬
`````
    on(이벤트명, 콜백) : 이벤트 이름과 이벤트 발생 시의 콜백을 연결 / 이 연결 동작을 이벤트 리스닝이라고 부름
    addListener(이벤트명) : on과 같은 기능
    emit(이벤트명) : 이벤트를 호출하는 메서드 / 이벤트 이름을 인수로 넣으면 미리 등록해줬던 이벤트 콜백이 실행
    once(이벤트명, 콜백) : 한 번만 실행되는 이벤트
    removeAllListeners(이벤트명) : 이벤트에 연결된 모든 이벤트 리스너를 제거
    removeListener(이벤트명, 리스너) : 이벤트에 연결된 리스너를 하나씩 제거 / 리스너는 필수 인자
    off(이벤트명, 콜백) : removeListener와 같은 기능
    listenerCount(이벤트명) : 현재 리스너가 몇 개 연결되어 있는지 확인
`````

## 3.8 예외 처리하기
노드에서는 예외(처리하지 못한 에러) 처리가 제일 중요함 -> 노드는 메인 스레드가 하나뿐이기 때문에
uncaughtException 이벤트 리스너로 모든 에러를 처리할 수 있는 것 같지만 노드 공식 문서에서는 `최후의 수단으로 사용`할 것을 명시
따라서 uncaughtException은 단순히 에러 내용을 기록하는 정도로 사용하고, 기록 후 process.exit()으로 프로세스 종료하는 것이 좋음
(error1.js / error2.js / error3.js / error4.js)

* 3.8.1 자주 발생하는 에러들
`````
    node: command not found : 환경 변수가 제대로 설정되지 않은 것
    ReferenceError : 모듈 is not defined : 모듈을 require 했는지 확인
    Error: Cannot find module 모듈명 : 해당 모듈을 require했지만 설치하지 않음
    Error: Can't set headers after they are sent : 요청에 대한 응답을 보낼 때 응답을 두번 이상 보냄
    FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory : 코드를 실행할 때 메모리가 부족하여 스크립트가 정상 동작 하지 않은 경우(코드가 잘못되었을 확률이 높음)
    UnhandledPromiseRejectionWarning : Unhandled promise rejection : 프로미스 사용시 catch 메서드가 없는 경우
    EADDRINUSE 포트 번호 : 해당 포트 번호에 이미 다른 프로세스가 연결되어 있음
    EACCESS 또는 EPERM : 노드가 작업을 수행하는 데 권한이 충분하지 않음
    EJSONPARSE : package.json 등의 JSON 파일에 문법 오류가 있는 경우
    ECONNREFUSED : 요청을 보냈으나 연결이 성립하지 않을 때 발생(요청을 받는 서버의 주소가 올바른지, 꺼져 있지는 않은지 확인해야함)
    ETARGET : package.json에 기록한 패키지 버전이 존재하지 않을 때 발생
    ETIMEOUT : 요청을 보냈으나 응답이 일정 시간 내에 오지 않을 때 발생
    ENOENT : no such file or directory : 지정한 폴더나 파일이 존재하지 않는 경우
`````

## 함께보면 좋은 자료 
[노드 공식 문서](https://nodejs.org/dist/latest-v14.x/docs/api/)
[NODE_OPTIONS](https://nodejs.ort/dist/latest-v14.x/docs/api/cli.html#cli_node_options_options)
[UV_THREADPOOL_SIZE](https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_uv_threadpool_size_size)
[에러 코드](https://nodejs.org/dist/latest-v14.x/docs/api/errors.html#errors_node_js_error_codes)
[uncaughtException](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_uncaughtexception)