// const express = require('express');
// const path = require('path');

// const app = express();
// app.set('port', process.env.PORT || 3000);

// /* 6.1 */
// // app.get('/', (req, res) => {
// //     // res.send('Hello, Express');
// //     res.sendFile(path.join(__dirname, '/index.html'));
// // });

// /* 6.2 */
// app.use((req, res, next) => {
//     console.log('모든 요청에 다 실행됩니다.');
//     next();
// });
// app.get('/', (req, res, next) => {
//     console.log('GET / 요청에서만 실행됩니다.');
//     next();
// }, (req, res) => {
//     throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
// });

// /* 에러 처리 매개변수는 4개, 모든 매개변수를 사용하지 않더라도 매개변수는 반드시 네 개여야 함 */
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send(err.message);
// });

// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트 대기중');
// });

/* 6.2 수정 */
// const express = require('express');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config(); // .env 파일을 읽어서 process.env로 만듬, 보안과 설정의 편의성 떄매 파일을 따로 관리
// const app = express();
// app.set('port', process.env.PORT || 3000);

// app.use(morgan('dev'));
// app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
//     name: 'session-cookie',
// }));

/*  multer 예제

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
} catch (error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',
    upload.fields([{ name: 'image1' }, { name: 'image2' }]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기중');
});
*/

/* 6.3 */
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기중');
});

