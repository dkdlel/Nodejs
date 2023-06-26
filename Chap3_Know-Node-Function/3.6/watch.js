const fs = require('fs');

/*
    change : 내용물을 수정 할 때
     => change이벤트가 두 번씩 발생하므로 실무에서 사용할 떄는 주의가 필요
    rename : 파일명을 변경하거나 파일을 삭제 할 때
    rename 이벤트가 발생한 후에는 더 이상 watch가 수행되지 않음
*/

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});