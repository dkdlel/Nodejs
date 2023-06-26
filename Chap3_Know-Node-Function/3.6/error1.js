/*
    에러가 발생할 것 같은 부분을 미리 try/catch로 감싸면 됨
*/

etInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 고장내주마!'); // 에러를 강제로 발생시킴
    } catch (err) {
        console.error(err);
    }
}, 1000);