var pg = require ('pg');

/*
var config = {
  user: 'postgres',
  database: 'rpg',
  password: 'Teamdream16',
  host: 'localhost',
  port: 5432,
};
var client = new pg.Client(config);
*/

var query = function (sql, values, on_finished);
{
  pool.query (sql, values, on_finished);
}

module.exports.query = query;
