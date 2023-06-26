# 2장 알아두어야 할 자바스크립트

## ES2015+
* const, let     
var을 대체하여 사용     

* 템플릿 문자열     
백틱(`)으로 감쌈     
문자열 안에 변수를 넣을 수 있음     

* 객체 리터럴     
객체의 메서드에 함수를 연결할 떄 콜른(:)과 function을 붙이지 않아도 됨     
속성명과 변수명이 동일한 경우에는 한 번만 써도 됨(코드의 중복을 피할 수 있어 편리)     

* 화살표 함수     
기존의 function() {}도 사용가능     
function 대신 => 기호로 함수를 선언, 변수에 대입하면 나중에 재사용 가능     
화살표 함수 내부에 return문밖에 없는 경우 retur문을 줄일 수 있음

* 구조분해 할당     
객체와 배열로부터 속서이나 요소를 쉽게 꺼낼 수 있음     

* 클래스     
프로토타입 기반 분법을 보기 좋게 클래스로 바꾼 것

* 프로미스     
자바스크립트와 노드의 API들이 콜백 대신 프로미스기반으로 재구성되며, 악명 높은 콜백 지옥 현상을 극복     
실행은 바로 하되 결과값은 나중에 받는 객체
```
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) =>{
    if(condition){
        resolve('성공');
    }else{
        reject('실패');
    }
});
// 다른 코드가 들어갈 수 있음
promise
    .ten((msg) =>{
        console.log(msg); // 성공(resolve)한 경우 실행
    })
    .catch((error) => {
        console.error(error); // 실패(reject)한 경우 실행
    })
    .finally(() =>{ // 끝나고 무조건 실행
        console.log('무조건');
    })
```

* async/await     
비동기 위주로 프로그래밍을 해야 할 때 도움이 많이 됨     
```
프로미스 코드
function findAndSaveUser(Users){
    Users.findOnd({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({gender: 'm'});
        })
        .then((user) =>{
            // 생략
        })
        .catch(err => {
            console.error(err);
        })
}

async/await
async funtion findAndSaveUser(Users){
    try{
        let user = await Users.findOndd({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
        // 생략
    }catch(error){
        console.error(error);
    }
}

화살표 함수
const findAndSaveUser => async (Users) => {
    try{
        let user = await Users.findOndd({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
        // 생략
    }catch(error){
        console.error(error);
    }
}
```
for문과 async/await을 같이 써서 프로미스를 순차적으로 실행
```
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    for await (promise of [promise1, promise2]){
        console.log(promise);
    }
})();
```

## 프런트엔드 자바스크립트
* AJAX(Asynchronous Javascript And XML)     
비동기적 웹 서비스를 개발할 때 사용하는 기법     
페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술     

* FormData     
주로 AJAX와 함께 사용되며, HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능

* encodeURIComponent, decodeURIComponent     
한글을 처리하기 위한 것     
서버 종류에 따라 다르지만 서버가 한글 주소를 이해하지 못하는 경우 한글 주소 부분만 encodeURIComponent 메서드로 감쌈
```
(async () => {
    try{
        const result = await axios.get(`https://www.zerocho.com/api/search/${encodeURIComponent('노드')}`);
        console.log(result);
        console.log(result.data); // {}
    }catch(error){
        console.error(error);
    }
})();

=> 노드라는 한글 주소가 %EB%85%B8%EB%93%9C라는 문자열로 변혼
```
받는 쪽에서는 decodeURIComponent를 사용하면 됨
```
decodeURIComponent(%EB%85%B8%EB%93%9C); // 노드
```

* 데이터 속성과 dataset     
프런트엔드에 데이터를 내려보낼 때 첫 번째로 고려해야 할 점은 보안(비밀번호 같은 건 절대 내려보내면 안됨)     
HTML 태그의 속성으로 data-로 시작하는 것들을 넣음     
화면에는 나타나지는 않지만 이 데이터들을 사용해 서버에 요청을 보내게 됨     
장점 : 자바스크립트로 쉽게 접근할 수 있음     
앞의 data- 접두어는 사라지고 - 뒤에 위치한 글자는 대문자가 됨(data-id => id, data-user-job => userJob)     
반대로 dataset에 데이터를 넣어도 HTML 태그에 반영(dataset.monthSalary = 10000 => data-month-salary="10000")
```
<ul>
    <li data-id="1" data-user-job="programmer">Zero</li>
    <li data-id="2" data-user-job="designer">Nero</li>
    <li data-id="3" data-user-job="programmer">Hero</li>
    <li data-id="4" data-user-job="ceo">Kero</li>
</ul>
<script>
    console.log(document.querySelector('li').dataset);
    // { id: '1', userJob: 'programmer' }
</script>
```

## 함께보면 좋은 자료
[ES2015 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)     
[ES 상세 후보군](https://github.com/tc39/proposals)     
[ES2015+ 브라우저/서버 호환 여부](http://kangax.github.io/compat-table/es6/)     
[브라우저별 기능 지원 여부 확인](https://caniuse.com/)     
[노드 버전별 ECMAScript 스펙](http://node.green)     
[AJAX 설명](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX)     
[axios](https://github.com/axios/axios)     
[FormData 설명](https://developer.mozilla.org/ko/docs/Web/API/FormData)     
[ESLint 툴](https://eslint.org/)     
[에어비앤비 코딩 스타일](https://github.com/airbnb/javascript)     
[저자의 블로그 ES2015+](https://zerocho.com/category/EcmaScript)     
[모던 자바스크립트 튜토리얼](https://ko.javascript.info/)     