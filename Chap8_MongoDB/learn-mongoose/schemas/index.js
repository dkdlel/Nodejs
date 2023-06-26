const mongoose = require('mongoose');

const connect = () => {
    /* 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 코드 */
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    /* 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 코드 */

    /* 몽구스와 몽고디비를 연결 */
    mongoose.connect('mongodb://이름:비밀번호@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
    /* 몽구스와 몽고디비를 연결 */
};
/* 몽구스 커넥션에 이벤트 리스너를 달아 둠 */
mongoose.connection.on('error', (error) => { // 에러 발생시 에러 내용을 기록
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => { // 연결 종료 시 재연결을 시도
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});
/* 몽구스 커넥션에 이벤트 리스너를 달아 둠 */

module.exports = connect;