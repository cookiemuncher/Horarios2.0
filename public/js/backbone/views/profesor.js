Alengi.Views.ProfesorView = Backbone.View.extend({
	events:{
		"click > td" : "navigate"
	},
	className:"",
	tagName:"tr",

	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change',function(){
			self.render();
		});


		this.template = swig.compile($("#r_dato").html());
		this.templateDetalle = swig.compile($("#r_detalle").html());
	},

	navigate : function(){
		console.log("funciona");
		Backbone.history.navigate('panel/main/'+ this.model.get('_id'), {trigger:true});
	},

	render: function(data){
		var self = this;
		var locals ={
			post : this.model.toJSON()
		};
				this.$el.html(this.template(locals));

		return this;
	}


});