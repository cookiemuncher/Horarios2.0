Alengi.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"panel/main" :  "root",
		"panel/main/profesor/:id" : "detalle"
	},

	initialize : function(){
		var self = this;
	},

	root: function(){
		window.app.state = "root";
	},

	detalle : function(id){
		window.app.state = "detalle";
		window.app.article = id;
	}
});