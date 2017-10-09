var http = require('http'),
    options = { // HTTPRequest의 옵션 설정
        'host': 'localhost',
        'port': '8081',
        'path': '/index.html'
    },
    callback = res => { // 콜백 함수로 Response를 받아온다.
        // data 이벤트가 감지되면 데이터를 body에 받아온다.
        var body = '';
        res.on('data', data => body += data);

        // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다.
        res.on('end', () => console.log(body)); // 데이터 수신 완료
    },
    req = http.request(options, callback); // 서버에 HTTP Request 를 날린다.
req.end();
