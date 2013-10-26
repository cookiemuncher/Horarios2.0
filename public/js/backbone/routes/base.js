Alengi.Routers.BaseRouter = Backbone.Router.extend({
	routes: {

		"panel/main/profesor/:id" : "detail"
	},
	initialize : function(){
		var self = this;

	},

	detail : function(id){

		window.app.state = "detail";
		window.app.modelo = id;
	}
});