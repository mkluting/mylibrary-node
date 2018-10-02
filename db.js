const mysql = require('mysql'),
      async = require('async');

const PROD_DB = 'mylibrary';
const TEST_DB = 'mylibrary-test';

const config = require('./config');

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

let state = {
    pool: null,
    mode: null
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: config.DB_HOST || 'localhost',
        user: config.DB_USER || '',
        password: config.DB_PASS || '',
        database: mode === exports.MODE_PRODUCTION ? PROD_DB : TEST_DB
    });

    state.mode = mode;
    done();
}

exports.get = function() {
    return state.pool;
}

exports.fixtures = function(data, done) {
    let pool = state.pool;
    if(!pool) return done(new Error('Missing database connection.'));

    let names = Object.keys(data.tables);
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            let keys = Object.keys(row),
                values = keys.map(function(key) { return "'" + row[key] + "'" })

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
}

exports.drop = function(tables, done) {
    let pool = state.pool;
    if(!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function(name, cb) {
        console.log("running delete from "+name);
        pool.query('DELETE FROM ' + name, cb);
    }, done)
}
