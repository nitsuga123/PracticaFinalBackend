var express = require('express');
var router = express.Router();
  var pg = require('pg');
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
  var client = new pg.Client(config);
    user_id = req.params.user_id;
    global.user_id = user_id;

    client.connect(function (err, client, done) {
      client.query('SELECT character_id, player_id, is_active FROM user_character WHERE player_id = $1', [user_id], function (err, result){ //organizar inner join depronto
        if (err){return console.error('error runnning query', err);}

        user_data  = JSON.stringify(result.rows);
        console.log(result.rows);
        res.send(user_data);
      });
    });
  });

router.post('/', function(req, res, next) {
  var client = new pg.Client(config);
      var b = req.body;
      var lp = b.lifepoints;
      var ap = b.attackpoints;
      var dp = b.defensepoints;
      var pId = global.user_id;
      var cId = b.character_id;
      var active = b.isAvailable;

        console.log(b);
        client.connect(function (err, client, done) {

          client.query('INSERT INTO user_character (life_points, attack_points, defense_points, player_id, character_id, is_active) VALUES ($1, $2, $3, $4, $5, $6)',[lp, ap, dp, pId, cId, active],function(err,data){
             if (err){return console.error('error runnning query', err);}

           });
        });
  });


  module.exports = router
