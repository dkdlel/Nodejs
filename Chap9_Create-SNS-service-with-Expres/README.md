# 9장 익스프레스로 SNS 서비스 만들기

## 9.1 프로젝트 구조 갖추기
`````
npm init
npm i sequelize mysql2 sequelize-cli -> node_modules 폴더, package-lock.json 생성
npx sequelize init -> config, migrations, models, seeders 폴더 생성
npm i express cookie-parser express-session morgan multer dotenv nunjucks
npm i -D nodemon
`````

## 9.2 데이터베이스 세팅하기
`````
npx sequelize db:create -> config.json에 저장된 데이터베이스가 생성
`````

## 9.3 Passport 모듈로 로그인 구현하기
`````
npm i passport passport-local passport-kakao bcrypt
`````
* Passport 모듈을 사용하여 세션, 쿠키 처리 등 복잡한 작업이 검증된 모듈을 사용(SNS 로그인도 가능)

`````
전체 과정
1. 라우터를 통해 로그인 요청이 들어옴
2. 라우터에서 passport.authenticate 메서드 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login 메서드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

로그인 이후의 과정
1. 요청이 들어옴
2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출
3. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
4. 조회된 사용자 정보를 req.user에 저장
5. 라우터에서 req.user 객체 사용 가능
`````