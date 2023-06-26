# 8장 몽고디비
* 몽고디비는 자바스크립트 문법을 사용함
* 몽고디비는 RDBMS가 아니라 특색이 뚜렷한 NoSQL이므로 특징을 잘 알고 사용해야 함

## 8.1 NoSQL vs SQL

|SQL(MySQL)|NoSQL(몽고디비)|
|:---:|:---:|
|SQL 사용|SQL 미사용|
|규칙에 맞는 데이터 입력|자유로운 데이터 입력|
|테이블 간 JOIN 지원|컬렉션 간 JOIN 미지원|
|안정성, 일관성|확장성, 가용성|
|용어(테이블, 로우, 컬럼)|용어(컬렉션, 다큐먼트, 필드)|


`````
MySQL은 user 테이블을 만들 때 name, age, married 등의 컬럼과 자료형, 옵션 드응ㄹ 정의
몽고디비는 users 컬렉션을 만들고 끝

몽고디비에는 JOIN 기능이 없기 때문에 동시에 쿼리를 수행하는 경우 쿼리가 섞여 예상치 못한 결과를 낼 수도 있음
`````

## 8.2 몽고디비 설치하기
[몽고디비 공식 사이트](https://www.mongodb.com/download-center/community)

* 윈도
다운로드 화면에서 On-premises를 선택 후, MongoDB Community Server 탭에서 Download

* 맥

`````
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

mongo로 실행
관리자 계정 추가 : use admin -> db.createUser({ user: '이름', pwd: '비밀번호', roles: ['root'] })

몽고디비가 인증을 하도록 설정
brew services stop mongodb-community
vim /usr/local/etc/mongod.conf 에 아래 두줄 추가
-> security:
    authorization: enabled

mongo admin -u [이름] -p [비밀번호] 로 접속
`````

* 리눅스(우분투)
명령어가 수시로 바뀌므로 고식 사이트를 참고
[공식 사이트](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

## 8.3 컴퍼스 설치하기
* 관리 도구로 컴퍼스를 제공
[공식 사이트](https://mongodb.com/download-center/compass)

* 맥
`brew cask install mongodb-compass-community`

## 8.4 데이터베이스 및 컬렉션 생성하기
* 데이터베이스 생성
`use [데이터베이스명]`

* 데이터베이스 목록을 확인
`show dbs`

* 현재 사용 중인 데이터베이스 확인
`db`

* 컬렉션 직접 생성
`db.createCollection(컬렉션 이름)`

* 컬렉션 목록 확인
`show collections`

## 8.5 CRUD 작업하기
* Create(생성)
`db.컬렉션명.save(다큐먼트)`
컬렉션에는 아무 데이터나 넣을 수 있는 장점이 있지만 무엇이 들어올지 모른다는 단점도 있음
몽고디비는 자바스크립트의 자료형을 따름
추가적인 자료형 : Date나 정규표현식 같은 자바스크립트 객체, Binary data, ObjectId, Int, Long, Decimal, Timestamp, JavaScript
Undefined와 Symbol은 자료형으로 사용하지 않음

`````
db.users.save({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.', createdAt: new Date() });
db.users.save({ name: 'nero', age: 34, married: true, comment: '안녕하세요. zero 친구 nero입니다.', createdAt: new Date() });

db.comments.save({ commenter: ObjectId('tmp'), comment: '안녕하세요. zero의 댓글입니다.', createdAt: new Date() });
`````

* Read(조회)
컬렉션 내의 모든 다큐먼트를 조회 : `db.users.find({})`
특정 필드만 조회(_id는 기본적으로 가져오게 되어 있으므로 0 또는 false를 입력해 가져오지 않도록 해야함)
자주 쓰이는 특수 연산자 : $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(같지 않음), $or(또는), $in(배열 요소 중 하나)

`````
name과 married 필드 가져오기(1,true로 표시한 필드만 가져옴) : db.users.find({}, { _id: 0, name: 1, married: 1 });
조회시 조건을 주려면 첫 번째 인수 객체에 기입 : db.users.find({ age: { $gt: 30 }, married: true }, {_id: 0, name: 1, age: 1 });
$or 조건 : db.users.find({ $or: [{ age: { $gt: 30 } }, { married: false }] }, { _id: 0, name: 1, age: 1 });
sort 메서드를 사용하여 정렬(1: asc, -1: desc) : db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 });
limit: db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1);
개수를 설정하면서 몇 개를 건너뛸지 설정(skip) : db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1).skip(1);
`````

* Update(수정)
`db.users.update({ 수정할 다큐먼트를 지정 }, { $set: { 수정할 내용을 입력 } });`
set : 어떤 필드를 수정할지 정하는 연산자 / 일반 객체를 넣으면 다큐먼트가 통째로 두 번째 인수로 주어진 객체로 수정
수정에 성공했을 경우 -> 첫 번째 객체 : 다큐먼트 수(nMatched), 두 번쨰 객체 : 다큐먼트 수(nModified)

`````
db.users.update({ name: 'nero' }, { $set: { comment: '안녕하세요. 이 필드를 바꿔보겠습니다!' } });
`````

* Delete(삭제)
`db.users.remove({ 삭제할 다큐먼트에 대한 정보 })`
삭제된 개수가 반환됨

`````
db.users.remove({ name: 'nero' });
`````

## 8.6 몽구스 사용하기

`````
npm i express morgan nunjucks mongoose
npm i -D nodemon
`````

몽고디비는 릴레이션이 아니라 다큐먼트를 사용하므로 ORM이 아니라 `ORM(Object Document Mapping)`이라고 불림
몽고디비에 없어서 불편한 기능들을 몽구스가 보완해주기 때문에 js이지만 js 객체와 매핑함
스키마(schema)라는 것이 생겼으므로 데이터를 넣기 전에 노드 서버 단에서 데이터를 한 번 필터링하는 역할을 함
MySQL에 있는 JOIN 기능을 populate라는 메서드로 어느 정도 보완(쿼리 한 번에 데이터를 합쳐서 가져오는 것은 아님)

몽고디비는 주소를 사용하여 연결하는 방법([] 부분은 있어도 되고 없어도 됨) : `mongodb://[username:password@]host[:port][/[database][?options]]`

`````
컬렉션 이름 바꾸기

model 메서드의 첫 번쨰 인수로 컬렉션 이름을 만듬
첫 번째 인수의 첫 글자를 소문자로 만든 뒤 복수형으로 바꿔서 컬렉션을 생성
이러한 '강제 개명'이 싫다면 세 번째 인수로 컬렉션 이름을 주면 됨
`````

## 8.7 함께 보면 좋은 자료
[몽고디비 문서](https://docs.mongodb.com)
[몽고디비 자료형 설명](https://docs.mongodb.com/manual/reference/bson-types)
[캠퍼스 매뉴얼](https://docs.mongodb.com/compass/master)
[몽구스 문서](https://mongoosejs.com/docs/guide.html)