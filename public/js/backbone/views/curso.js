Alengi.Views.CursoView = Backbone.View.extend({
	events:{
		"click .detalle" : "detalle",
		"click .editable" : "editable"
	},
	className:"",
	tagName:"tr",

	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change',function(){
			self.render();
		});

		this.template = swig.compile($("#r_dato_c").html());
	},

	editable : function(){
		$("#update").removeClass("no-ver");
		$('.form-control').removeAttr('disabled');
	},

	detalle : function(){
		var self = this;
		self.render("detalle");
		
	},

	render: function(data){
		
		var self = this;
		var locals ={
			post : this.model.toJSON()
		};
		
		if(data == "detalle"){
				var view = new Alengi.Views.DetalleView(this.model);
				view.render();
				$("#resul_d section").remove();
				view.$el.appendTo("#resul_d");		
		}else{
			this.$el.html(this.template(locals));
		}

		return this;
	}


});