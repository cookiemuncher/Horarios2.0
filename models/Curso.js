module.exports = function(mongoose, models){
	var collection = 'Curso'
	, Schema = mongoose.Schema;

	var schema = new Schema({
		nombre:String,
		ciclo: String,
		codigo: String,
		faculta:[String],
		profesors: [{type: mongoose.Schema.Types.ObjectId, ref : 'Profesor'}],
		creditos: String
	});

	this.model = mongoose.model(collection, schema);

	return this;
};