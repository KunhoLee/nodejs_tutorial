var http = require('http'),
    fs = require('fs'),
    url = require('url');

// 서버 생성
http.createServer((req, res) => {
    // URL 뒤에 있는 디렉토리/파일이름 파싱
    var pathname = url.parse(req.url).pathname;

    console.log('Request for ' + pathname + ' received');

    // 파일 이름이 비어 있다면 index.html 로 설정
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // 파일을 읽기
    fs.readFile(pathname.substr(1), (err, data) => {
        if (err) {
            console.log(err);
            // 페이지를 찾을 수 없음
            // HTTP Status: 404: NOT FOUND
            // Content-Type: text/html
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // 페이지를 찾음
            // HTTP Status: 200: OK
            // Content-Type: text/html
            res.writeHead(200, {'Content-Type': 'text/html'});

            // 파일을 읽어와서 responseBody 에 작성
            res.write(data.toString());
        }
        // responseBody 전송
        res.end();
    });
}).listen(8081, () => console.log('Server running at http://127.0.0.1:8081/'));
