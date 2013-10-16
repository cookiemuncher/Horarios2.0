module.exports = function(models, app){

	 this.loaderGet = function(req, res){
	 	var fs = require('fs');

		fs.readFile('profesores.txt','utf8',function(err,data){
			if(err){
				return console.log(err);
			}
			var datos = data.replace(/\r\n\r\n|\n\n|\r\r/g,".");

			var doc = datos.split(".");
				res.render('./panel/loader',{
	        	isAdmin: req.session.isAdmin,
	        	data: req.session.user,
	        	docs: doc
	        	});

			for(i=0;i<5;i++){
				var inutil = doc[i];
				var attr = inutil.split(/\r\n|\n|\r/g,"|");
				for(j=0;j<2;j++){
					var inutil2 = attr[j];
				}
			}
		});
       
        
    };

    this.loadProfes = function(req, res){
    	var fs = require('fs');

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

				var foto = f_letter + f_last_name[0];

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
			res.render('./panel/loader',{
	        	isAdmin: req.session.isAdmin,
	        	data: req.session.user,
	        	docs: docs
	        	});
		});
      

    };

    return this;
}
