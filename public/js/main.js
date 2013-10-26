$(document).ready(function(){

	window.routers.detail = new Alengi.Routers.BaseRouter();
	window.collections.profesors = new Alengi.Collections.ProfesorsCollection;
	window.collections.cursos = new Alengi.Collections.CursosCollection;
	
	$("#lupa").keyup(function(){
		$("#resul tr").remove();

		var dato = $(this).val();
		var oR = $('input[name="oR"]:checked').attr('value');
	
		if(dato.length != 0){

			if(oR == "o1"){


			var xhr = $.get("http://localhost:3000/panel/qp/" + dato);

				xhr.done(function(data){				
					data.forEach(function(obj){
						window.collections.profesors.add(obj);
					});
				});

				window.collections.profesors.on('add', function(model){
					var view = new Alengi.Views.ProfesorView(model);
					$("#resul tr[_id="+ model.get('_id') +"]").remove();
					view.render();
					view.$el.appendTo("#resul");
				});

			}else{
			var xhr = $.get("http://localhost:3000/panel/qc/" + dato);

				xhr.done(function(data){				
					data.forEach(function(obj){
						window.collections.cursos.add(obj);
					});
				});

				window.collections.cursos.on('add', function(model){
					var view = new Alengi.Views.CursoView(model);
					$("#resul tr[_id="+ model.get('_id') +"]").remove();
					view.render();
					view.$el.appendTo("#resul");
				});

			}
		}
	});


	Backbone.history.start({
					root : "/",
					pushState : true,
					silent : false
				});

	$("#r1, #r2").change(function () {
		$("#lupa").val('');
	});


	

});

