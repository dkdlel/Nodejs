const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep); // 경로의 구분자
console.log('path.delimiter:', path.delimiter); // 환경 변수의 구분자
console.log('--------------------');
console.log('path.dirname():', path.dirname(string)); // 파일이 위피한 폴더 경로를 보여줌
console.log('path.extname():', path.extname(string)); // 파일의 활장자를 보여줌
console.log('path.basename():', path.basename(string)); // 파일의 이름(확장자 포함)을 표시
console.log('path.basename - extname:', path.basename(string, path.extname(string))); // 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣음
console.log('--------------------');
console.log('path.parse()', path.parse(string)); // 파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format():', path.format({ // path.pars()한 객체를 파일 경로로 합침
    dir: 'C:\\users\\zerocho',
    name: 'path',
    ext: '.js',
}));
console.log('path.normalize():', path.normalize('C:\\users\\\\zerocho\\\path.js')); // /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환
console.log('--------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\')); // 파일의 경로가 절대경로인지 상대경로인지를 true, false로 알림
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('--------------------');
console.log('path.relative():', path.relative('C:\\uers\\zerocho\\path.js', 'C:\\')); // 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 법을 알림
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zeriocho')); // 여러 인수를 넣으면 하나의 경로로 합침, 상대경로인..(부모 디렉터리)과 .(현 위치)도 알아서 처리
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho')); // path.join()과 비슷하지만 차이가 있음 -> /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시, path.join은 상대경로로 처리
