module.exports = function(mongoose, models){
	var collection = 'Profesor'
	, Schema = mongoose.Schema;

	var schema = new Schema({
		nombre: String,
		apellido: String,
		faculta: String,
		cursos: [{type: mongoose.Schema.Types.ObjectId, ref : 'Curso', default: null }],
		picture: String
	});

	this.model = mongoose.model(collection, schema);

	return this;
};