/*
    readFile 메서드를 사용하여 복사
*/

const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
// 1GB 용량의 파일을 복사하기 위해 메모리에 파일을 올려 둔 후 수행했기 때문에 메모리 용량이 1GB를 넘음
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);