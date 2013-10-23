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
        dato = req.params.dato;
        return models.Profesor.find({nombre: new RegExp('^' + dato, "i")}, function(err, doc){
          if(!err){
                return res.send(doc);
            }else{
                return console.log(err);
            }
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
