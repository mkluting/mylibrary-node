module.exports = function(app, db) {

    let Book = require('./models/book');
    let Movie = require('./models/movie');
    /** BOOKS API */

    /**
     *  Get All Books
     */
    app.route('/api/books').get((req,res) => {
        let data = Book.getAll(function(data){
            res.send(data);
        });
    });

    /**
     *  Get Book By Id
     */
    app.route('/api/books/:id').get((req, res) => {
        let bookId = req.params['id'];
        let data = Book.get(bookId, function(data) {
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
        Book.create(book, function(data) {
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
        };
        Book.update(id, book, function(data) {
            res.status(200).send(data);
        });
    });

    // DELETE BOOK BY ID
    app.route('/api/books/:id').delete((req, res) => {
        const id = req.params['id'];
        Book.delete(id, function(data) {
            res.status(204).send();
        });
    });


    // MOVIES API
    // Get All Movies
    app.route('/api/movies').get((req,res) => {
        let data = Movie.getAll(function(data){
            res.send(data);
        });
    });

    // Get Movie by ID
    app.route('/api/movies/:id').get((req, res) => {
        let movieId = req.params['id'];
        let data = Movie.get(movieId, function(data) {
            res.send(data);
        });
    });

    // Update Movie
    app.route('/api/movies').post((req, res) => {
        let movie = {
            title: req.body.title,
            director: req.body.director,
            type: req.body.type,
            series: req.body.series,
            series_num: req.body.series_num,
            owner: req.body.owner
        };
        Movie.create(movie, function(data) {
            res.status(201).send(data);
        });
    });

};
