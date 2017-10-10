module.exports = (app, fs) => {
    app.get('/', (req, res) => {
        var sess = req.session;
        res.render('index', {
            'title': 'MY HOMEPAGE',
            'length': 5,
            'name': sess.name,
            'username': sess.username
        });
    });
    app.get('/list', (req, res) => fs.readFile(
        __dirname + '/../data/' + 'user.json',
        'utf8',
        (err, data) => {
            console.log(data);
            res.end(data);
        }
    ));
    app.get('/getUser/:username', (req, res) => fs.readFile(
        __dirname + '/../data/' + 'user.json',
        'utf8',
        (err, data) => {
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        }
    ));
    app.post('/addUser/:username', (req, res) => {
        var result = {},
            username = req.params.username;
        // CHECK REQ VALIDITY
        if (!req.body['password'] || !req.body['name']) {
            result['success'] = 0;
            result['error'] = 'invalid request';
            return res.json(result);
        }
        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(
            __dirname + '/../data/' + 'user.json',
            'utf8',
            (err, data) => {
                var users = JSON.parse(data);
                if (users[username]) {
                    // DUPLICATION FOUND
                    result['success'] = 0;
                    result['errer'] = 'duplicate';
                    return res.json(result);
                }
                // ADD TO DATA
                users[username] = req.body;
                // SAVE DATA
                fs.writeFile(
                    __dirname + '/../data/' + 'user.json',
                    JSON.stringify(users, null, '\t'),
                    'utf8',
                    (err, data) => {
                        result['success'] = 1;
                        res.json(result);
                    }
                );
            }
        );
    });
    app.put('/updateUser/:username', (req, res) => {
        var result = {},
            username = req.params.username;
        // CHECK REQ VALIDITY
        if (!req.body['password'] || !req.body['name']) {
            result['success'] = 0;
            result['error'] = 'invalid request';
            return res.json(result);
        }
        // LOAD DATA
        fs.readFile(
            __dirname + '/../data/' + 'user.json',
            'utf8',
            (err, data) => {
                var users = JSON.parse(data);
                // ADD/MODIFY DATA
                users[username] = req.body;
                // SAVE DATA
                fs.writeFile(
                    __dirname + '/../data/' + 'user.json',
                    JSON.stringify(users, null, '\t'),
                    'utf8',
                    (err, data) => {
                        result['success'] = 1;
                        res.json(result);
                    }
                );
            }
        );
    });
    app.delete('/deleteUser/:username', (req, res) => {
        var result = {};
        // LOAD DATA
        fs.readFile(
            __dirname + '/../data/' + 'user.json',
            'utf8',
            (err, data) => {
                var users = JSON.parse(data);
                // IF NOT FOUND
                if (!users[req.params.username]) {
                    result['success'] = 0;
                    result['error'] = 'not found';
                    return res.json(result);
                }
                delete users[req.params.username];
                fs.writeFile(
                    __dirname + '/../data/' + 'user.json',
                    JSON.stringify(users, null, '\t'),
                    'utf8',
                    (err, data) => {
                        result['success'] = 1;
                        return res.json(result);
                    }
                );
            }
        );
    });
    app.get('/login/:username/:password', (req, res) => {
        var sess = req.session;
        fs.readFile(
            __dirname + '/../data/' + 'user.json',
            'utf8',
            (err, data) => {
                var users = JSON.parse(data),
                    username = req.params.username,
                    password = req.params.password,
                    result = {};
                if (!users[username]) {
                    // USERNAME NOT FOUND
                    result['success'] = 0;
                    result['error'] = 'not found';
                    return res.json(result);
                } else if (users[username]['password'] === password) {
                    result['success'] = 1;
                    sess.username = username;
                    sess.name = users[username]['name'];
                    return res.json(result);
                } else {
                    result['success'] = 0;
                    result['error'] = 'incorrect';
                    return res.json(result); 
                }
            }
        );
    });
    app.get('/logout', (req, res) => {
        var sess = req.session;
        if (sess.username) {
            req.session.destroy(err => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });
};
