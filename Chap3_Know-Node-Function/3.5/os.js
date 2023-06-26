const os = require('os');

console.log('운영체제 정보--------------------------');
console.log('os.arch():', os.arch()); // process.arch와 동일
console.log('os.platform():', os.platform()); // process.platform과 동일
console.log('os.type():', os.type()); // os의 종류를 보여 줌
console.log('os.uptime():', os.uptime()); // os 부팅 이후 흐른 시간(초)을 보여줌 / process.uptime() : 노드의 실행시간
console.log('os.hostname():', os.hostname()); // 컴퓨터의 이름
console.log('os.release():', os.release()); // os의 버전

console.log('경로--------------------------');
console.log('os.homedir():', os.homedir()); // 홈 디렉토리 경로
console.log('oss.tmpdir():', os.tmpdir()); // 임시 파일 저장 경로

console.log('cpu 정보--------------------------');
console.log('os.cpus():', os.cpus()); // 컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length);

console.log('메모리 정보--------------------------');
console.log('os.freemem():', os.freemem()); // 사용 가능한 메모리(RAM)을 보여줌
console.log('os.totalmem():', os.totalmem()); // 전체 메모리 용량을 보여줌