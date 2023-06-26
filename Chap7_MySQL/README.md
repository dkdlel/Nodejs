# 7장 MySQL
* 서버가 종료되면 저장했던 데이터도 사라지기 떄문에 데이터베이스를 사용

## 7.1  데이터베이스란?
* `데이터베이스`는 관련성을 가지며 중복이 없는 데이터들의 집합
* 이러한 데이터베이스를 관리하는 시스템을 `DBMS`(DataBase Management System)(데이터베이스 관리 시스템)라고 부름
* 서버에 데이터베이스를 올리면 여러 사람이 동시에 사용할 수 있음
* `RDBMS`(Relational DMBS)라고 부르는 관계형 DBMS가 많이 사용됨
    - Oracle, MySQL, MSSSQL 등이 있음

## 7.2 MySQL 설치하기
* 7.2.1 윈도
[MySQL 공식사이트](https://dev.mysql.com/downloads/installer)

* 7.2.2 맥

`````
1. Homebrew를 통해 MySQL을 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

2. Homebrew를 통해 MySQL을 설치
brew install mysql
brew services start mysql
mysql_secure_installation

3. MySQL에 접속
경로 상관 없이 mysql -h localhost -u root -p로 입력
`````

* 7.2.3 리눅수(우분투)

`````
sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
`````

## 7.3 워크벤치 설치하기
* 7.3.1 윈도
MySQL과 함께 설치 완료

* 7.3.2 맥
`brew cask install mysqlworkbench`

* 7.3.3 리눅스(우분투)
GUI를 사용하지 않으므로 워크벤치를 설치하지 않음

## 7.4 데이터베이스 및 테이블 생성하기
* 7.4.1 데이터베이스 생성하기
`CREATE SCHEMA [데이터베이스명]`

* 7.4.2 테이블 생성하기
`오타가 나지 않도록 주의`
한 글자라도 잘못 입력하면 에러가 발생하니 조심해야 함

`````
INT : 정수
FLOAT, DOUBLE : 소수
VARCHAR(자릿수) : 가변 길이
CHAR(자릿수) : 고정 길이 / 길이보다 짧은 문자열을 넣으면 부족한 자릿수만큼 스페이스가 채워짐
TEXT : 긴 글을 저장할 때 사용
TINYINT : -128 ~ 127
DATETIME : 날짜와 시간에 대한 정보

NULL, NOT NULL : 빈칸을 허용할지 여부를 묻는 옵션
AUTO INCREMENT : 숫자를 저절로 올리겠다는 뜻
UNSIGNED : 숫자 자료형에 적용되는 옵션(음수는 무시)
ZEROFILL : 숫자의 자릿수가 고정되어 있을 때 사용할 수 있으며 빈자리에는 모두 0을 넣음
DEFAULT : 기본 값 셋팅
CURRENT_TIMESTAMP, now() : 현재 시각
PRIMARY KEY : 기본 키, 고유 값
UNIQUE INDEX : 해당 값이 고유해야 하는지에 대한 옵션

COMMENT : 테이블에 대한 보충 설명
DEFAULT CHARACTER SET utf8로 설정하지 않으면 한글이 입력되지 않음
ENGINE : MyISAM, InnoDB가 자주 사용
`````

외래 키(foreign key) : 다른 테이블의 기본 키를 저장하는 컬럼
`CONSTRAINT [제약조건명] FOREIGN KEY [컬럼명] REFERENCES [참고하는 컬럼명]`

## 7.5 CRUD 작업하기
* CRUD (Create, Read, Update, Delete)

* 7.5.1 Create(생성)
데이터를 생성해서 데이터베이스에 넣는 작업
데이터를 넣는 명령어 `INSERT INTO [테이블명] ([컬럼1], [컬럼2], ...) VALUES ([값1], [값2], ...)`

* 7.5.2 Read(조회)
데이터베이스에 있는 데이터를 조회하는 작업
데이터를 조회하는 명령어 `SELECT * FROM [테이블명]`

* 7.5.3 Update(수정)
데이터베이스에 있는 데이터를 수정하는 작업
데이터를 수정하는 명령어 `UPDATE [테이블명] SET [컬럼명=바꿀 값] WHERE [조건]`

* 7.5.4 Delete(삭제)
데이터베이스에 있는 데이터를 삭제하는 작업
데이터를 삭제하는 명령어 `DELETE FROM [테이블명] WHERE [조건]`

## 7.6 시퀄라이즈 사용하기
시퀄라이즈(Sequelize) : 노드에서 MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
시퀄라이즈는 ORM으로 분류
ORM(Object-relational Mapping) : 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구

`````
learn-sequelize

sequelize-cli : 시퀄라이즈 명령어를 실행하기 위한 패키지
mysql2 : MySQL과 시퀄라이즈를 이어주는 드라이버
설치 완료 후 sequelize init 명령어 호출

npm i express morgan nunjucks sequelize sequelize-cli mysql2
npm i -D nodemon
`````

sequelize-cli가 자동으로 생성해주는 코드는 그대로 사용할 때 에러가 발생하고, 필요 없는 부분도 많음
Sequelize는 시퀄라이즈 패키지이자 생성자, config/config.json에서 DB 설정을 불러 옴

* 7.6.1 MySQL 연결하기
(app.js)

`````
config/config.json

기본 : development
배포용 : production
테스트용 : test
`````

* 7.6.2 모델 정의하기
(models/user.js/comment.js)
MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야 함
시퀄라이즈는 기본적으로 모델 이름은 단수형으로, 테이블 이름은 복수형으로 사용

`````
모델은 크게 static init 메서드와 static associate 메서드로 나뉨

init 메서드
    - 테이블에 대한 설정
    - 첫 번째 인수 : 테이블 컬럼에 대한 설정
    - 두 번째 인수 : 테이블 자체에 대한 설정

associate 메서드
    - 다른 모델과의 관계를 적음
`````

MySQL과 시퀄라이즈의 비교
|MySQl|시퀄라이즈|
|:---:|:---:|
|VARCHAR(100)|STRING(100)|
|INT|INTEGER|
|TINYINT|BOOLEAN|
|DATETIME|DATE|
|INT UNSIGNED|INTEGER.UNSIGNED|
|NOT NULL|allowNULL: false|
|UNIQUE|unique: true|
|DEFAULT now()|defaultValue: Sequelize.NOW|

`````
    super.init 메서드의 두 번째 인수는 테이블 옵션

    sequelize: static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 함(나중에 model/index.js에서 연결)
    timestamps: true인 경우 시퀄라이즈는 createAt과 updateAt 컬럼을 추가 / 로우가 생성,수정될 떄의 시간이 자동으로 입력
    underscored: 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 camel case로 만듦. 이를 snake case로 바꾸는 옵션
    modelName: 모델 이름을 설정할 수 있음
    tableName: 실제 데이터베이스의 테이블 이름 / 기본적으로 모델 이름을 소문자 및 복수형으로 만듦
    paranoid: true인 경우 deleteAt이라는 컬럼이 생김 / 로우를 삭제할 때 완전히 지워지지 않고 deleteAt에 지운 시각이 기록 / 나중에 row를 복원하기 위해 null인 로우가 존재
    charset과 collate: 각각 utf8과 utf8_general_ci로 설정해야 한글 입력 가능 / 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 utf8mb4_general_ci를 입력
`````

* 7.6.3 관계 정의하기
users 테이블과 comments 테이블 간의 관계를 정의

`````
1:N 관계
hasMany 메서드
    - users 테이블의 로우 하나를 불러올 때 연결된 comments 테이블의 로우들도 같이 불러옴
    - sourceKey 속성에 id를 넣음
belongsTo 메서드
    - comments 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져옴
    - targetKey 속성에 id를 넣음
foreignKey를 따로 지정하지 않으면 모델명+기본 키인 컬럼이 모델에 생성됨

1:1 관계
hasOne 메서드
belongsTo 메서드

N:M
belongsToMay 메서드
`````

* 7.6.4 쿼리 알아보기

`````
* insert
INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
->
const { User } = require('../models');
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개1',
});

* 전체 조회
SELECT * FROM nodejs.users;
->
User.findAll({});

* 레코드 한개
SELECT * FROM nodejs.users LIMIT 1;
->
User.findOne({});

* atrributes 옵션을 사용해서 원하는 컬럼만 가져오기
SELECT name, married FROM  nodejs.users;
-> 
User.findAll({
    attributes: ['name',  'married'],
});

* where 옵션이 조건들을 나열하는 옵션
Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하), Op.ne(같지 않음), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름)
SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
->
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: 1,
        age: { [Op.gt]: 30 },
    },
});

SELECT id, name FROM users WHERE married = 0 OR age > 30;
->
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or]: [{ married: 0 }, { age: { [Op.gt]: 30 } }],
    }
});

* 정렬
SELECT id, name FROM users ORDER BY age DESC;
->
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
});

* LIMIT
SELECT id, name FROM users ORDER BY age DESC LIMIT 1;
->
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
});

* OFFSET
SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
->
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
});

* update (첫 번째 인수 : 수정할 내용 / 두 번째 인수 : 어떤 로우를 수정 할지)
UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
    comment = '바꿀 내용',
}, {
    where: { id: 2 },
});

* delete
DELETE FROM nodejs.users WHERE id = 2;
User.destory({
    where: { id: 2 },
});
`````


findOne, findAll 메서드를 호출할 때 프로미스의 결과로 모델을 반환
include를 통해 JOIN 기능 가능

`````
const user = await User.findOne({
    include: [{
        model: Comment,
    }]
});
console.log(user.Comments); // 사용자 댓글
관계를 설정했다면 getComments(조회), setComments(수정), addComment(하나 생성), addComments(여러 개 생성), removeComments(삭제)
`````

시퀄라이즈의 쿼리를 사용하지 않는 경우 직접 SQL문을 통해 쿼리 가능
`const [result, metadata] = await sequelize.query('SELECT * FROM comments');`

* 7.6.5 쿼리 수행하기
(views/sequelize.html, views/error.html, public/sequelize.js, routes/index.js, routes/users.js)

## 7.7 함께 보면 좋은 자료
[데이터베이스 설명](https://ko.wikipedia.org/wiki/데이터베이스)
[MySQL 매뉴얼](https://dev.mysql.com/doc/refman/8.0/en)
[워크벤치 매뉴얼](https://dev.mysql.com/doc/workbench/en)
[시퀄라이즈 문서](https://docs.sequelizejs.com)