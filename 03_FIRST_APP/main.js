const http = require('http');

http.createServer((req, res) => {
    /*
        HTTP 헤더 전송
        HTTP Status: 200 : OK
        Content Type: text/plain
    */
    res.writeHead(200, { 'Content-type': 'text/plain' });
    /*
        Response Body 를 "Hello World" 로 설정
    */
    res.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');
