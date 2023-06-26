const exec = require('child_process').exec;

// var process = exec('ls'); // 명령어를 대입
var process = exec('pwd'); // 명령어를 대입

process.stdout.on('data', function (data) { // 표준 출력
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function (data) { // 표준 에러
    console.error(data.toString());
}); // 실행 에러