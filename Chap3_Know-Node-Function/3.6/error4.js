// 처리하지 못한 에러가 발생했을 때 이벤트 리스너가 실행되고 프로세스가 유지
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

// uncaughtException 이 없다면 setTimeout이 실행되지 않음
setTimeout(() => {
    console.log('실행됩니다');
}, 2000);