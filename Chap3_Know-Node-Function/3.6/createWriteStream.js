const fs = require('fs');

/*
    createWriteStream : 쓰기 스트림을 만듬
    - 첫 번째 인수 : 출력 파일명을 입력
    - 두 번쨰 인수 : 옵션
*/

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => { // 파일 쓰기가 종료되면 콜백 함수가 호출
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n'); // 넣을 데이터를 씀
writeStream.write('한 번 더 씁니다.'); // 여러번 호출 가능
writeStream.end(); // 종료를 알림, 이때 finish 이벤트가 발생