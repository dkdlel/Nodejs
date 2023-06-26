const fs = require('fs');

/*
    createReadStream : 읽기 스트림을 만듬
    - 첫 번째 인수 : 읽을 파일 경로
    - 두 번째 인수 :  옵션 객체(highWaterMark = 버퍼의 크기(바이트 단위)를 정할 수 있는 옵션 / 기본값은 64KB)

    readStream은 이벤트 리스너를 붙여서 사용 (보통 data, end, error 이벤트를 사용)
*/

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => { // 파일을 읽기 시작
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => { // 파일을 다 읽음
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => { // 파일을 읽는 도중 에러가 발생
    console.log('error :', err);
});