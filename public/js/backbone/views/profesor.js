Alengi.Views.ProfesorView = Backbone.View.extend({
	events:{
		"click > #r_dato" : "navigate"
	},
	className:"",
	tagName:"li",

	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change',function(){
			self.render();
		});

		this.template = swig.compile($("#r_dato").html());
	},
	navigate : function(){
		Backbone.history.navigate('profesor/'+ this.model.get('nombre'), {trigger:true});
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