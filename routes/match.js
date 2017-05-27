var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;
var user_list = [];
var winner_id;
var losser_id;
var amount_valid_id=0;

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

/* GET home page. */
router.get('/:users_id?', function(req, res, next) {
  client = new pg.Client(config);
  var users_id = req.params.users_id;
  var query = url.parse (req.url, true).query;
  var score1 = query.score1;
  var score2 = query.score2;
  var query_data=[];

  client.connect (function (err, client, done){
    if (err){return console.error('error runnning query', err);}
    if(users_id)
    {
      user_list[0] = users_id.split('-')[0]
      user_list[1] = users_id.split('-')[1]

      client.query('SELECT count (1) FROM leaderboard WHERE "user_id" in ($1, $2)', [user_list[0], user_list[1]], function (err, result){
        if (err){return console.error('error runnning query', err);}

        if(result.rows[0]["count"] == 2)
        {
          if((query.score1 && query.score2))
          {
            compare_scores(score1,score2, user_list);
            for (var i = 0; i <= 1; i++) {

                client.query('UPDATE leaderboard SET score = score + $1 WHERE user_id = $2', [(i == 0) ? 10 : -10,(i == 0) ? winner_id : losser_id], function (err, result){
                  if (err){return console.error('error runnning query', err);}
                });
            }
            client.query('SELECT * FROM leaderboard ORDER BY score DESC', function (err, result){
              if (err){return console.error('error runnning query', err);}
              var leaderboard=""
              for (var i = 0; i < result.rows.length; i++) {
                leaderboard += (JSON.stringify(result.rows[i]) +'</br>')
              }
              res.send("El usuario con id: " + winner_id + " es el ganador." +'</br>'+"El usuario con id: " + losser_id + " es el perdedor." +'</br>'+"El nuevo score de los usuario se presenta a continuación:" +'</br>'+'</br>'+leaderboard)
            });
          }
          else{
            res.send("Aún no ha introducido lo scores. Ingreselos para poder saber quien gana y quien pierde")
          }
        }
        else{
        //hacer un split para separar a varibale ne los dos ids que se necesitan.
        res.send("Alguno de los IDs ingresados no es válido. Revise nuevamente los IDs válidos.")
        return;
        }
      });
    }
    else{
      res.send("Ingrese dos ids y su puntaje en la partida para emepzar la partida")
    }
  });
  //HACER UN QUERY PARA OBTENER L RESULTADO D ELA PARTIA
});

function compare_scores(score1, score2, user_list)
{
  if(score1 > score2)
  {
    winner_id = user_list[0]
    losser_id = user_list[1]
  }
  else{
    winner_id = user_list[1]
    losser_id = user_list[0]
  }
}

module.exports = router;
