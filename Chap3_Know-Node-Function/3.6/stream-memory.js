const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');

readStream.pipe(writeStream);
// 큰 파일을 조각내어 작은 버퍼 단위로 옮겼기 때문에 이전 방식에 비해 엄청난 개선 효과가 나타남
readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
});