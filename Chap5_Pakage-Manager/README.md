# 5장 패키지 매니저

## 5.1 npm 알아보기
* npm(Node Package Manager)
* npm에 업로드된 노드 모듈을 패키지라고 부름
* yarn은 npm의 대체자

## 5.2 package.json으로 패키지 관리하기
* 노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 package.json부터 만들고 시작해야함
* package.json이란?
`설치한 패키지의 버전을 관리하는 파일`
* 프로젝트 폴더 이름과 프로젝트 이름이 같으면 안됨

`````
    package name : 패키지의 이름 / package.json의 name 속성에 저장
    version : 패키지의 버전
    entry point: 자바스크립트 실행 파일 진입점 / 보통 마지막으로 module.exports를 하는 파일을 지정
    test command : 코드를 테스트할 때 입력할 명령어를 의미 / package.json scripts 속성 안의 test 속성에 저장
    git repository : 코드를 저장해둔 깃(Git) 저장소 주소를 의미
    keywords: npm 공식 홈페이지(https://npmjs.com)에서 패키지를 쉽게 찾을 수 있도록 해줌
    licensee: 해당 패키지의 라이선스를 넣으면 됨
`````

* npm run express : 익스프레스(Express)설치
* 모듈을 여러 개 동시에 설치 : npm install 패키지1 패키지2 ...
    ex) npm install morgan cookie-parser express-session
* 실제 배포가 아닌 개발용 패키지 설치 : npm install --save-dev 패키지 ...
    devDependencies 속성에는 개발용 패키지들만 따로 관리
* npm에는 전역(global) 설치 옵션이 있음
    전역에서 설치한 패키지는 콘솔의 명령어로 사용 가능

## 5.3 패키지 버전 이해하기
* 버전은 항상 세 자리임
    - 세 자리인 이유 : SemVer(Semantiv Versioning / 유의적 버전) 방식의 버전 넘버링을 따르기 때문
    - 첫 번째 자리 : major 버전 / 0이면 초기 개발 중, 1부터는 정식 버전
    - 두 번째 자리 : minor 버전 / 하위 호환이 되는 기능 업데이트를 할 때 올림
    - 세 번쨰 자리 : patch 버전 / 새로운 기능이 추가되었다기보다는 기존 기능에 문제가 있어 수정했을때 올림

* 새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안됨
    - 수정 사항이 생기면 major, minor, patch 버전 중 하나를 의미에 맞게 올려서 새로운 버전으로 배포해야 함

* ^ 기호 : minor 버전까지만 설치 ( ~보다 ^이 많이 사용되는 이유는 minor 버전까지는 하위 호환이 보장되기 때문 )
* ~ 기호 : patch 버전까지만 설치
* @latest : 안정된 최신 버전의 패키지를 설치
* @next : 가장 최근 배포판을 사용할 수 있음 (안정되지 않은 알파나 베타 버전의 패키지 설치 가능)

## 5.4 기타 npm 명령어
* npm outdated 명령어로 업데이트할 수 있는 패키지가 있는지 확인
    - `npm update 패키지명`으로 업데이트 할 수 있음
    - Current와 Wanted가 다르다면 업데이트가 필요한 경우
    - npm update를 하면 업데이트 가능한 모든 패키지가 Wanted에 적힌 버전으로 업데이트
* npm uninstall 패키지명 : 해당 패키지를 제거
    - `npm rm 패키지명` 으로 줄여 쓰기도 가능
* npm search 검색어 : npm의 패키지를 검색 가능
    - npm 공식 사이트(https://npmjs.com)에서 검색하면 편리
* npm info 패키지명 : 패키지의 세부 정보를 파악
* npm adduser : npm 로그인을 위한 명령어
* npm whoami : 로그인한 사용자가 누구인지 알림 / 로그인된 상태가 아니라면 에러가 발생
* npm logout : npm adduser로 로그인한 계정을 로그아웃할때 사용
* npm version 버전(원하는 버전의 숫자) : package.json의 버전을 올림
* npm deprecate 패키지명 버전 메세지 : 해당 패키지를 설치할 때 경고 메세지를 띄우게 하는 명령어
* npm publish : 자신이 만든 패키지를 배포할 때 사용
* npm unpublish : 배포한 패키지를 제거 / 24시간 이내에 배포한 패키지만 제거 가능(의존성 관계 때문에)
* npm ci : package.json 대신 package-lock.json에 기반하여 패키지를 설치
[npm 공식 문서](https://docs.npmjs.com/)

## 5.5 패키지 배포하기
* npm 계정을 만들어야 함
`````
    1. npm 웹 사이트(https://www.npmjs.com) 우측 상단의 회원가입을 함
    2. 회원가입 confirm 메일을 확인
    3. 콘솔에서 npm adduser 명령어를 입력하여 생성한 계정으로 로그인
`````

* npm 배포 시 주의 사항
`````
    코드가 세상에 공개되는 것이므로 배포 전에 개인정보가 코드에 들어 있지 않은지 꼭 확인 해야함
    특히, 다른 서비스와 연동하다가 서비스의 비밀 키를 넣어두는 경우가 많음

    실제로 사용할 패키지가 아님에도 이름을 선점하는 행위는 삼가해야함
    기존에 있는 패키지와 비슷한 이름으로 새 패키지를 배포하거나 다른 패키지의 코드를 살짝 수정해서 배포하는 경우 원작자의 허락을 받아야 함
`````

## 5.6 함꼐 보면 좋은 자료
[npm 공식 웹 사이트](https://npmjs.com)
[yarn 공식 웹 사이트](https://yarnpkg.com)
[npm 명령어 설명서](https://docs.npmjs.com/cli)
[패키지 간 비교 사이트](https://npmcompare.com)
[패키지 다운로드 추이 확인](https://npmtrends.com)
[패키지명에 네임스페이스 설정하기](https://docs.npmjs.com/misc/scope)