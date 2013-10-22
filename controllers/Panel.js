module.exports = function(models, app){

	 this.panelGet = function(req, res){    
        res.render('./panel',{
        	isAdmin: req.session.isAdmin,
        	data: req.session.user
        });
    };

    this.mainGet = function(req, res){
        res.render('./panel/Main',{
            isAdmin: req.session.isAdmin,
            data: req.session.user
        });
    }

    this.query = function(req, res){
        datos = req.params.datos:
        model.findOne({datos: new RegExp('^'+name+'$', "i")}, function(err, doc) {
          //Do your action here..
        });
    }

     this.readProfesores = function(req, res){
     	return models.Profesor.find(function(err,profesors){
     		if(!err){
     			return res.send(profesors);
     		}else{
     			return console.log(err);
     		}	
     	});
     }

     this.readProfesor = function(req, res){
     	return models.Profesor.findById(req.params.id, function(err,profesor){
     		if(!err){
     			return res.send(profesor);
     			console.log("fun" + profesor);
     		}else{
     			return console.log(err);
     		}	
     	});
     }

    return this;
}
