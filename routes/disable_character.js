var express = require('express');
var router = express.Router();

global.user_id = require('../user_id');

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;
var user_id;
var character_id;
var is_active;


router.post('/', function(req, res, next) {
  var client = new pg.Client();
  console.log(req.body);
      var b = req.body;
      console.log(b);
      user_id = global.user_id;
      character_id = b.character_id;
      is_active = b.is_active;

        console.log(b);
        client.connect(function (err, client, done) {

          client.query('UPDATE user_character SET is_active = $1 WHERE player_id = $2 AND character_id = $3 ',[is_active, user_id, character_id],function(err,data){
             if (err){return console.error('error runnning query', err);}
              res.send('Ok');
           });
        });
  });

module.exports = router
