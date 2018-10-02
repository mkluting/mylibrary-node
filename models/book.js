let mysql = require('mysql');
let config = require('../config');

let sql = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: "mylibrary"
});

sql.connect(function(err) {
    if(err) console.log('error');
    if(!err) console.log('connected');
});

var Book = {};

Book.createBook = function(newBook, cb){
    sql.query('INSERT INTO books (title, author_first, author_last, binding_type, series, series_num, owner, isbn_13, isbn_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [newBook.title, newBook.author_first, newBook.author_last, newBook.binding_type, newBook.series, newBook.series_num, newBook.owner, newBook.isbn_13, newBook.isbn_10], function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Book.updateBook = function(id, book, cb) {
    sql.query('UPDATE books SET title = ?, author_first = ?, author_last = ?, binding_type = ?, series = ?, series_num = ?, owner = ?, isbn_13 = ?, isbn_10 = ? WHERE id = ?', [book.title, book.author_first, book.author_last, book.binding_type, book.series, book.series_num, book.owner, book.isbn_13, book.isbn_10, id], function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Book.deleteBook = function(id, cb) {
    sql.query('DELETE FROM books WHERE id = ?', id, function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Book.getAllBooks = function(cb, params) {
    let query = 'SELECT * FROM books order by author_last asc, author_first asc, series asc, series_num asc';
    sql.query(query, function(err, res) {
        if(err) {
            throw err;
        }
        else {
            cb(res);
        }
    });
}

Book.getBookById = function(id, cb) {
    sql.query('SELECT * FROM books WHERE id = ?', id, function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

module.exports = Book;
