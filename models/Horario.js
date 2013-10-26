module.exports = function(mongoose, models){
	var collection = 'Horario'
	, Schema = mongoose.Schema;

	var schema = new Schema({
		idp: [{type: mongoose.Schema.Types.ObjectId, ref : 'Profesor'}],
		cursos: [Schema.Types.Mixed]
	});

	this.model = mongoose.model(collection, schema);

	return this;
};