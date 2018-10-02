module.exports = function(app, db) {

    let Book = require('./models/book');
    // BOOKS API
    // GET ALL BOOKS
    app.route('/api/books').get((req,res) => {
        let data = Book.getAllBooks(function(data){
            res.send(data);
        });
    });

    // GET BOOK BY ID
    app.route('/api/books/:id').get((req, res) => {
        let bookId = req.params['id'];
        let data = Book.getBookById(bookId, function(data) {
            res.send(data);
        });
    });

    // CREATE NEW BOOK 
    app.route('/api/books').post((req, res) => {
        let book = {
            title: req.body.title,
            author_first: req.body.author_first,
            author_last: req.body.author_last,
            binding_type: req.body.binding_type,
            series: req.body.series,
            series_num: req.body.series_num,
            isbn_13: req.body.isbn_13,
            isbn_10: req.body.isbn_10,
            owner: req.body.owner 
        };
        Book.createBook(book, function(data) {
            res.status(201).send(data);
        });
    });

    // UPDATE EXISTING BOOK
    app.route('/api/books/:id').put((req, res) => {
        const id = req.params['id'];
        let book = {
            title: req.body.title,
            author_first: req.body.author_first,
            author_last: req.body.author_last,
            binding_type: req.body.binding_type,
            series: req.body.series,
            series_num: req.body.series_num,
            isbn_13: req.body.isbn_13,
            isbn_10: req.body.isbn_10,
            owner: req.body.owner
        }
        Book.updateBook(id, book, function(data) {
            res.status(200).send(data);
        });
    });

    // DELETE BOOK BY ID
    app.route('/api/books/:id').delete((req, res) => {
        const id = req.params['id'];
        Book.deleteBook(id, function(data) {
            res.status(204).send();
        });
    });
};
