const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

if (isMainThread) { // 현재 코드가 메인 스레드에서 실행되는지, 생성한 워크 스레드에서 실행되는지 구분
    // 부모일 때
    const worker = new Worker(__filename); // 현재 파일을 워커 스레드에서 실행
    // worker.once('message') : 메시지를 한 번만 받음
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit')); // 종료될때 실행됨
    worker.postMessage('ping'); // 워커에 데이터를 보냄
} else {
    // 워커일 때
    parentPort.on('message', (value) => { // 부모로부터 메시지를 받고
        console.log('from parent', value);
        parentPort.postMessage('pong'); // 부모에게 메시지를 보냄
        parentPort.close(); // worker에서 on 메서드를 사용하면 직접 워커를 종료해야 함
    });
}