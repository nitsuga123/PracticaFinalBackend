var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;
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
router.get('/:character_id?', function(req, res, next) {
//  var client = new pg.Client();
  var character_id = req.params.character_id;
  var query = url.parse(req.url,true).query;
  var user_id = query.user_id;
  var nc;
  //HACER UN QUERY PARA ASQUIRIR EL DI DEL USUARIO QUE DESEA DESBLOQUEAR EL CHARACTER
  client.connect(function (err, client, done) {
    if (err){
      return console.log("error fetching client");
    }

    if(character_id)
    {
      client.query('SELECT "base_health", "base_attack", "base_defense", "base_sp_attack", "base_sp_defense" FROM "character" WHERE "id" = $1 ', [character_id], function (err, result){
        if (err){
          return console.error('error runnning query', err);
        }
        var ci=result.rows
        if (result.rows[0] == null)
        {
          res.send("No ha introducido un charcater_id válido, porfavor revise nuevamnte los IDs válidos");
          return;
        }
        else{
          if(query.user_id){
            client.query('SELECT "id" FROM "user" WHERE "id" = $1',[user_id], function (err, data){
              if (err){return console.error('error runnning query', err);}
              if (data.rows[0] == null)
              {
                res.send("No ha introducido un user_id válido, porfavor revise nuevamnte los IDs válidos");
                return;
              }
              client.query('SELECT count (1) FROM user_character WHERE character_id in (SELECT character_id FROM user_character WHERE character_id = $1) AND player_id = $2', [character_id, user_id], function (err, data){
                if (err){
                  return console.error('error runnning query', err);
                }
                if(data.rows[0]["count"] == 0)
                {
                  client.query('INSERT INTO user_character (player_id, character_id, life_points, attack_points, defense_points, sp_attack_points, sp_defense_points) VALUES ($1,$2,$3,$4,$5,$6,$7)', [user_id, character_id,ci[0].base_health,ci[0].base_attack,ci[0].base_defense,ci[0].base_sp_attack,ci[0].base_sp_defense], function (err, data){
                    if (err){
                      return console.error('error runnning query', err);
                    }
                    res.send("Ha incluido un nuevo personaje a su lista.")
                  });
                }
                else{
                  res.send("Usted ya tiene un persoanje con este ID, ingrese un ID que aún no tenga en su lista.")
                  return;
                }
              });
            });
          }
          else {
            client.query('SELECT * FROM "character" WHERE "id" = $1', [character_id], function (err, data){
              if (err){
                return console.error('error runnning query', err);
              }
                res.send(data.rows[0])
            });
          }
        }
      });
    }
    else {
    res.send("Ha ingresado a desbloquear un perosnaje")
    return;
    }
  });
});

function do_unlock(){
  router.post('/:character_id?', function(req, res, next) {
    //ENTREGAR EL PERSONAJE DESBLOQUEADO
    client.query('INSERT INTO user_character (user_id,item_id, amount) VALUES ($1,$2,1)', [character_id], function (err, data){
      if (err){
        return console.error('error runnning query', err);
      }
      if (data.rows[0] == null)
      {
        res.send("Ha ingresado un ID inexistenete para un personaje. IDs disponibles: 11, 12, 13.")
        return;
      }
    });
  });
}


module.exports = router;
