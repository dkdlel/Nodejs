const zlib = require('zlib'); // 파일을 압축하는 모듈
const fs = require('fs');

/*
    버퍼 데이터가 전달되다가 gzip 압축을 거친 후 파일로 써짐
*/

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);