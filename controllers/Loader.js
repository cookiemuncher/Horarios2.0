module.exports = function(models, app){
	var fs = require('fs');


    this.loadCursos = function(req, res){
    	fs.readFile('cursos.txt','utf8',function(err,data){
    		if(err){
				return console.log(err);
			}

			var docs = data.split(/\r\n|\n|\r/g);

			for(i=0;i<docs.length;i++){
				var datos = docs[i].split('|');

				var ciclex = datos[0]
				   ,cod = datos[1]
				   ,facus = datos[2].split(",")
				   ,nom = datos[3]
				   ,cred = datos[4];

				 var  curso = new models.Curso({
				 	nombre:nom,
					ciclo: ciclex,
					codigo: cod,
					faculta: facus,
					creditos: ciclex
				 }); 

				 curso.save(function (err) {
	                if (err) {
	                	return handleError(err);
	           		 	 }
	           		 }); 				
			}
			res.render('./panel',{
	        	isAdmin: req.session.isAdmin,
	        	});		
    	});
    	console.log('Carga de cursos completada!');
    };

    this.loadProfes = function(req, res){
		fs.readFile('profesores.txt','utf8',function(err,data){
			if(err){
				return console.log(err);
			}
			var datos = data.replace(/\r\n\r\n|\n\n|\r\r/g,".");

			var docs = datos.split(".");

			for(i=0;i<docs.length;i++){
				var one_doc = docs[i];
				var attr_doc = one_doc.split(/\r\n|\n|\r/g);
				//nombre apellido
				var attr_1 = attr_doc[0];
				var nombres = attr_1.split(",");

				//link foto
				var f_letter = nombres[1].substr(0,1);
				var f_last_name = nombres[0].split(" ");

				var foto = f_letter + f_last_name[0] + f_last_name[1].substr(0,2);

				foto = foto.toLowerCase() + ".jpg";

				//facultades
				var attr_2 = attr_doc[1]
				var facus = attr_2.split(",");	
				console.log(facus);

				var profe = new models.Profesor({
                nombre: nombres[1],
                apellido: nombres[0],
                faculta: facus,
                picture: foto
            	});

            	profe.save(function (err) {
	                if (err) {
	                	return handleError(err);
	           		 	 }
	           		 }); 		
			}
			res.render('./panel',{
	        	isAdmin: req.session.isAdmin,
	        	});
		});
    };

    return this;
}
