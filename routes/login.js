var express = require('express');
var router = express.Router();
var current_user = router.current_user;

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;

var c1 ;
var c2 ;
var c3 ;
var id;

var info = [{
  "saludo" : "hola",
  "despedida" : "chao"
}];


var current_team;
var user_gold;
var user_data;
var user_id;
/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
//var client = new pg.Client();
  user_id = req.params.user_id;

  client.connect(function (err, client, done) {
    client.query('SELECT * FROM "user" WHERE "id" =$1', [user_id], function (err, result){ //organizar inner join depronto
      if (err){return console.error('error runnning query', err);}

      user_data  = JSON.stringify(result.rows);
      res.send(user_data);
    });
  });
});


module.exports = router
