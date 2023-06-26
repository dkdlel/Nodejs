const fs = require('fs').promises;

/*
    8.5버전 이후에는 createReadStream과 createWriteStream을 pipe하지 않아도 파일 복사 가능
*/

fs.copyFile('readme4.txt', 'writeme4.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((error) => {
        console.error(error);
    })