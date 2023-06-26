const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt'); // 읽기 스트림을 미리 생성
const writeStream = fs.createWriteStream('writeme3.txt'); // 쓰기 스트림을 미리 생성
readStream.pipe(writeStream); // 위 두 개의 스트림 사이를 pipe 메서드로 연결