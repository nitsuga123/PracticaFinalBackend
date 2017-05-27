var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { head: "RPG GAME",
                        title: 'Servicios disponibles',
                        match: '-Realizar una partida entre dos usuarios: .../match/(id del usuario 1)-(id usuario 2)?score1=(score usuario 1)&score2=(score usuario 2)',
                        team: '-Recuperar y modificar equipo de un usuario: .../team/(id del usuario deseado)?c1=(id personaje)&c2=(id personaje)&c3=(id personaje) NOTA= no es necesario meter los 3 ids',
                        unlock: '-Comprar un item:  .../unlock_character/(id del personje deseado)?user_id=(id del usuario deseado)',
                        upgrade: '-Mejorar un stat de algún personaje:  .../upgrade_stat/(id del usuario deseado)?cr=(id del personaje deseado)&stat=(stat a mejorar)'});
});

module.exports = router;
