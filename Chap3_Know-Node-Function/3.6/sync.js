const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
console.log('끝');

/*
Sync 메서드 : 순차 적으로 실행 함 -> 동기 메서드
writeFileSync도 있음

단점 : 이전 작업이 완료되어야 다은 작업을 진행할 수 있음

*/