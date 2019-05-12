var config = require('config');
var mysql = require('mysql');
var utils = require('../helpers/helper')

function createConnection() {
    return mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),

        port: config.get('mysql.port')
    });
}

function getConnection() {
    var connection = createConnection();
    if (connection != null) {
        console.log('Success connect to db');
        return connection;
    }
    console.log('Failed connect to db');
    return null;
}

module.exports = {
    update: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            var sql = `UPDATE ${tableName} set ? WHERE id = ?`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, [entity, entity.id], (err, value) => {
                if (err) reject(err);
                else resolve(value.id);
                conn.end();
            })
        })
    },

    //delete by id
    deleteById: (tableName, id) => {
        return new Promise((resolve, reject) => {
            var sql = `DELETE from ${tableName} WHERE id=?`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, id, (err, value) => {
                if (err) reject(err);
                else resolve(value);
                conn.end();
            });
        })
    },
    //Find all table in db
    findAll: (tableName) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName}`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) reject(err);
                else resolve(value);
                conn.end();
            });
        })
    },
    findById: (tableName, id) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} WHERE id = ?`;
            var conn = createConnection();
            entity["updated_at"] = utils.GetTimeNow();
            conn.connect();
            conn.query(sql, id, (err, value) => {
                if (err) reject(err);
                else {
                    resolve(value[0]);
                }
                conn.end();
            });
        });
    },
    findOne: (tableName, field, username) => {
        //     var sql = `SELECT * from ${tableName} WHERE ${field} = ?`;
        //     var conn = getConnection();
        //     conn.query(sql, username, function(err, value) {
        //         if (err) reject(err);
        //         else {
        //             resolve(value);
        //         }
        //         connec
        //     });
        console.log(username);
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} WHERE ${field} = ?`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, username, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value[0]);
                }
                conn.end();
            });
        });
    },
    add: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            var sql = `insert into ${tableName} set ?`;
            var conn = createConnection();
            conn.connect();
            entity["created_at"] = utils.GetTimeNow();
            entity["updated_at"] = utils.GetTimeNow();
            conn.query(sql, entity, (error, value) => {

                if (error) reject(error);
                else {
                    resolve(value.InsertId);
                }
                conn.end();

            });
        });
    },
    //Display top 10 hot news
    displayTopHotNew: (tableName) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} ORDER BY post_date DESC LIMIT 10 `;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value);
                }
                conn.end();
            })
        })
    },
    //Display top 10 news that get lots of views
    displayTopViewer: (tableName) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} ORDER BY views DESC LIMIT 10 `;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) reject(err);
                else resolve(value);
                conn.end();
            })
        })
    },
    findListByField: (tableName, field, value) => {
        return new Promise((resolve, reject) => {
            var sql = `select * from ${tableName} where ${field} = ${value}`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value[0]);
                }
                conn.end();
            });
        });
    },

    getConnection: getConnection
}