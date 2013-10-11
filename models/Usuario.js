module.exports = function(mongoose, models){
	var collection = 'Usuario', 
		Schema = mongoose.Schema;

		var schema = new Schema({
			usuario : String,
			password: String,
			date 	: {type: Date, default: Date.now},
			nombre  : String,
			faculta : String
		});

		this.model = mongoose.model(collection, schema);

		return this;
}