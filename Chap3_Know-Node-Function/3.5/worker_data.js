const {
    Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) {
    // 부모일 때
    const threads = new Set();
    threads.add(new Worker(__filename, { // 두 번째 인수의 workerData 속성으로 원하는 데이터를 보낼 수 있음
        workerData: { start: 1 },
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));
    for (let worker of threads) {
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('job done');
            }
        });
    }
} else {
    // 워커일 때
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}