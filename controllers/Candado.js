module.exports = function(models,app){

	//revisar si usuario esta logueado
	this.checkAuth = function(req,res,next){
		if(!req.session.isAdmin){
			res.redirect(app.locals.routes.login);
		}else{
			next(); //continua con el siguiente controlador
		}
	}
	//cargar pagina login
	this.loginGet = function(req,res){
		res.render('./login');
		if(req.session.isAdmin == true){
			res.redirect('/panel');
		}else{
			res.render('./login');
		}	
	}
	//ejecutar login
	this.validar = function(req,res){
		user = req.body.usuario;
		pass = req.body.password;

	models.Usuario.findOne({usuario: user}, 'usuario password', function(err,resp){
		if(err) return handleError(err);

		if(resp != null){
			if(resp.usuario == user && resp.password == pass){
			req.session.isAdmin = true;
			req.session.user = {
				"username" : user,
				"firstname" : "Enzo Israel"
			};
				res.redirect('/panel');		
			}else{
				res.render('./login', {
                error: 'Invalid login/password'
            });
				console.log("Password incorrect");
		}
		}else{
			console.log("Error de existencia de colleccion.");
			res.redirect('/login');
		}
	
	});
	
	};
	//terminar sesion
	this.logout = function(req,res){
		delete req.session.isAdmin;
		res.redirect(app.locals.routes.login);
	};

	return this;
}