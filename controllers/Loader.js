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
			console.log(docs.length);

			for(i=0;i<docs.length;i++){
				var one_doc = docs[i];
				var attr_doc = one_doc.split(/\r\n|\n|\r/g);
				//nombre apellido
				var attr_1 = attr_doc[0];
				var nombres = attr_1.split(",");

				var profe = new models.Profesor({
                nombre: nombres[0],
                apellido: nombres[1]
            	});

            	profe.save(function (err) {
                if (err) {
                	return handleError(err);
           		 	 }
           		 }); 

            	res.render('./panel/loader',{
	        	isAdmin: req.session.isAdmin,
	        	data: req.session.user,
	        	docs: docs
	        	});
				//facultades
				//var attr_2 = attr_doc[1]		
			}
		});
      

    };

    return this;
}
