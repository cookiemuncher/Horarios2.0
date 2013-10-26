Alengi.Views.DetalleView = Backbone.View.extend({
	events:{
		
	},
	className:"",
	tagName:"section",
	initialize : function(model){
		var self = this;
		this.model = model;
		this.model.on('change',function(){
			self.render();
		});

		this.templateDetalle = swig.compile($("#r_detalle").html());
	},


	render: function(data){
		var self = this;
		var locals ={
			post : this.model.toJSON()
		};
				this.$el.html(this.templateDetalle(locals));

		return this;
	}


});