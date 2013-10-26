
var express = require('express')
  , app = express()	
  , cons = require('consolidate')
  , mongoose = require('mongoose')
  , swig = require('swig')
  , server = require('http').createServer(app)
  , MongoStore = require('connect-mongo')(express)
  , i18n = require("i18n-2")
  , path = require('path');

  
 // Cargar configuracion del server
 var config = require('./config.js')(app, express, mongoose, cons, swig, MongoStore, path, i18n); 
 // Cargar modelos
 var models = {};
 models.Usuario = require('./models/Usuario')(mongoose, models).model;
 models.Profesor = require('./models/Profesor')(mongoose, models).model;
 models.Curso = require('./models/Curso')(mongoose,models).model;
 models.Horario = require('./models/Horario')(mongoose,models).model;
 
 app.locals({
 	
 	 routes:{
 		login: 		'/login',
 		logout: 	'/logout',
 		panel: 		'/panel',
    panelMain:'/panel/main',
    panelQp:   '/panel/qp/:dato',
    panelQc:   '/panel/qc/:dato',
    leng :     '/lang/:dato',
    horario: '/panel/horario/:id',
    crear_horario: '/panel/crear-horario/:id',
    //profesores: '/panel/profesores',
    //profesor:   '/panel/profesores/:id',
    load:     '/panel/load',
    load2:    '/panel/load2',
 	}
 });
 // Cargar controladores
 var candado = require('./controllers/Candado')(models, app);
 var panel = require('./controllers/Panel')(models, app);
 var loader = require('./controllers/Loader')(models, app);
 // Cargar inicio

 app.get('/', function(req, res){
	res.render('index',{
		title: 'A L E N G I',
		isAdmin: req.session.isAdmin,
		data: req.session.user
	});
 });
 // Iniciar routes y controllers
 app.get(app.locals.routes.panel, candado.checkAuth, panel.panelGet);
 app.get(app.locals.routes.panelMain, candado.checkAuth, panel.mainGet);
 app.get(app.locals.routes.panelQp, panel.queryP);
 app.get(app.locals.routes.panelQc, panel.queryC);
 app.get(app.locals.routes.leng, panel.leng);
 app.get(app.locals.routes.horario, candado.checkAuth, panel.ver_H_Get);
 app.get(app.locals.routes.crear_horario, candado.checkAuth, panel.crear_H_Get);
 
 //app.get(app.locals.routes.profesores, candado.checkAuth, panel.readProfesores);
 //app.get(app.locals.routes.profesor, candado.checkAuth, panel.readProfesor);

 app.get(app.locals.routes.load, loader.loadProfes);
 app.get(app.locals.routes.load2, loader.loadCursos);

 app.get(app.locals.routes.logout, candado.logout);
 app.get(app.locals.routes.login, candado.loginGet);
 app.post(app.locals.routes.login, candado.validar);
 // Iniciando listening
 var port = process.env.PORT || 3000;
 app.listen(port, function() {
	console.log("Listening on " + port);
 });

