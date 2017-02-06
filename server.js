/***CREATE SERVER **/
var express		= require('express');
var http 	= require('http');
var app 		= express();

// Get dependencies
var bodyParser	= require('body-parser');
var path 		= require('path');
var morgan		= require('morgan');

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Instace server
var server 	= http.createServer(app); //HTTP server
var io 		= require('socket.io').listen(server); //Websocket init

/*JUST IN TEST*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set our api routes taking socket server as argument
var carreraRouterDB = require('./server/routes/CarreraRoutes')(io);
var routerCarrera = carreraRouterDB.router; //Se toma la ruta
var CarreraModel = carreraRouterDB.model; //Se toma el modelo
var routerGrupo = require('./server/routes/GrupoRoutes')(io);

//Las rutas de alumno ocupan del modelo de carrera
var routerAlumno = require('./server/routes/AlumnoRoutes')(io,CarreraModel);

//Se asocian las rutas de las entidades a cada 
app.use('/api', routerCarrera);
app.use('/api', routerGrupo);
app.use('/api', routerAlumno);


var depositoRouter = require('./server/routes/DepositoRoutes');
app.use('/api', depositoRouter);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**Get port from environment and store in Express.**/
//var port = process.env.PORT || '3000';
var port = process.env.PORT || '8000';
app.set('port', port);

/** Listen on provided port, on all network interfaces. **/
server.listen(port, () => console.log(`API running on localhost:${port}`));
io.set("origins", "*:*");