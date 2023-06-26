/*
    require 함수 안에 불러올 모듈의 경로를 적음
    파일 경로세어 js나 json같은 확장자는 생략 가능
*/

const { odd, even } = require('./var');

function checkOddOrEven(num) {
    if (num % 2) { // 홀수이면
        return odd;
    }
    return even
}

module.exports = checkOddOrEven;