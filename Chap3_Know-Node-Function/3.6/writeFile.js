const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다') // 생성된 파일의 경로와 내용을 입력
    .then(() => {
        return fs.readFile('./writeme.txt'); // 생성된 파일을 읽음
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });