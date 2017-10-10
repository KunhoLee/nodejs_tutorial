// routes/index.js

module.exports = (app, Book) => {
    // GET ALL BOOKS
    app.get('/api/books', (req,res) =>
        Book.find((err, books) => {
            if (err) {
                return res.status(500).send({ "error": "database failure" });
            } else {
                return res.json(books);
            }
        })
    );

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', (req, res) =>
        Book.findOne({ "_id": req.params.book_id }, (err, book) => {
            if (err) {
                return res.status(500).json({ "error": err });
            } else if (!book) {
                return res.status(404).json({ "error": "book not found" });
            } else {
                return res.json(book);
            }
        })
    );

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', (req, res) =>
        Book.find(
            { "author": req.params.author },
            { "_id": false, "title": true, "published_date": true },
            (err, books) => {
                if (err) {
                    return res.status(500).json({ "error": err });
                } else if (books.length === 0) {
                    return res.status(404).json({ "error": "book not found" });
                } else {
                    return res.json(books);
                }
            }
        )
    );

    // CREATE BOOK
    app.post('/api/books', (req, res) => {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(err => {
            if (err) {
                console.log(err);
                return res.json({ "result": 0});
            } else {
                return res.json({ "result": 1});
            }
        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', (req, res) =>
        Book.findById(req.params.book_id, (err, book) => {
            if (err) {
                return res.status(500).json({ "error": "database failure" });
            } else if (!book) {
                return res.status(404).json({ "error": "book not found" });
            }

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(err => {
                if (err) {
                    return res.status(500).json({ "error": "failed to update" });
                } else {
                    res.json({ "message": "book updated" });
                }
            });
        })
    );

    // DELETE BOOK
    app.delete('/api/books/:book_id', (req, res) =>
        Book.remove(
            { "_id": req.params.book_id },
            (err, output) => {
                if (err) {
                    return res.status(500).json({ "error": "database failure" });
                } else {
                    /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
                    if(!output.result.n) return res.status(404).json({ error: "book not found" });
                    res.json({ message: "book deleted" });
                    */
                    return res.status(204).end();
                }
            }
        )
    );

}
