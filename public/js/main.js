$(document).ready(function(){

	window.collections.profesors = new Alengi.Collections.ProfesorsCollection;
	
	$("input").keyup(function(){
		$("#resul li").remove();
		var dato = $(this).val();
		if(dato.length != 0){

			var xhr = $.get("query/" + dato);

			xhr.done(function(data){
			
				data.forEach(function(obj){
					window.collections.profesors.add(obj);
				});
			});

		window.collections.profesors.on('add', function(model){
			var view = new Alengi.Views.ProfesorView(model);
			$("#resul li[_id="+ model.get('_id') +"]").remove();
			view.render();
			view.$el.appendTo("#resul");
		});

		}
	});

	Backbone.history.start({
					root : "/",
					pushState : true,
					silent : false
				});
});

