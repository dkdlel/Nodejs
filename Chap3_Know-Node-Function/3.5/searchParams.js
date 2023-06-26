const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); // getAll(키): 키에 해당하는 모든 값들을 가져옴
console.log('searchParams.get():', myURL.searchParams.get('limit')); // get(키): 키에 해당하는 첫 번째 값만 가져옴
console.log('searchParams.has():', myURL.searchParams.has('page')); // has(키): 해당 키가 있는지 없는지를 검사

console.log('searchParams.keys():', myURL.searchParams.keys()); // keys(): searchParams의 모든 키를 반복기 객체로 가져옴
console.log('searchParams.values():', myURL.searchParams.values()); // values(): searchParams의 모든 값을 반복기 객체로 가져옴

// append(키, 값): 해당 키ㅣ를 추가, 같은 키의 값이 있다면 유지하고 하나 더 추가
myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

// set(키, 값): append와 비슷하지만, 같은 키의 값들을 모두 지우고 새로 추가
myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

// delete(키) : 해당 키를 제거
myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

// toString() : 조작한 searchParams 객체를 다시 문자열로 만듬
console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
