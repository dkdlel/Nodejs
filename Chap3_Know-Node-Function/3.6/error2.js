/*
    프로미스 에러는 catch하지 않아도 알아서 처리 됨
*/

const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => { // 존재하지 않는 파일을 지움
        if (err) {
            console.error(err);
        }
    });
}, 1000);