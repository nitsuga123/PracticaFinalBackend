var pg = require ('pg');


var query = function (sql, values, on_finished);
{
  pool.query (sql, values, on_finished);
}

module.exports.query = query;
