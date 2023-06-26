/*
    스레드풀이 작업을 동시에 처리 하므로 실행할 떄마다 시간과 순서가 달라짐
    스레드풀의 개수는 4개임
    하지만 1~4, 5~8 그룹이 묶여있고 5~8이 시간이 더 소요됨
*/

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8:', Date.now() - start);
});