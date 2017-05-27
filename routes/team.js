var express = require('express');
var router = express.Router();
var current_user = router.current_user;

global.user_id = require('../user_id');

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
var current_team;
var user_gold;
var user_data;
var user_id;
/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
//var client = new pg.Client();
  user_id = req.params.user_id;

  client.connect(function (err, client, done) {
    client.query('SELECT player_id, character_id_1, character_id_2, character_id_3, "user"."gold" FROM "teams" JOIN "user" ON "player_id" = "user"."id" Where player_id =$1', [user_id], function (err, result){ //organizar inner join depronto
      if (err){return console.error('error runnning query', err);}

      user_data  = JSON.stringify(result.rows);
      res.send(user_data);
    });
  });
});

router.post('/', function(req, res, next) {
  var client = new pg.Client();
        var b = req.body;
        user_id = global.user_id;
        c1 = b.character_id_1;
        c2 = b.character_id_2;
        c3 = b.character_id_3;
        gold = b.gold;

        console.log(user_id);

        client.connect(function (err, client, done) {

          client.query('UPDATE "teams" SET character_id_1 = $1, character_id_2 = $2, character_id_3 = $3 WHERE player_id = $4',[c1,c2,c3,user_id],function(err,data){
             if (err){return console.error('error runnning query', err);}
             client.query('UPDATE "user" SET gold = $1 WHERE id = $2',[gold, user_id],function(err,data){
                if (err){return console.error('error runnning query', err);}
                res.send("ok");
              });
           });
        });

});


module.exports = router
