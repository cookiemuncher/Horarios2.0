var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function validatePresenceOf(value){
  	return value && value.length;
  }

exports.connect = function(){
	mongoose.connect('mongodb://localhost/horariosDB',function(err){
  	if(!err){
  		console.log('conectado a MongoDB')
  	}else{
  		throw err;
  	}
  });
}
exports.loginSchema = function(){
	var loginSchema = new Schema({ 
  	usuario: { type:String,validate:[validatePresenceOf,'campo obligatorio']},
  	password: { type:String,validate:[validatePresenceOf,'campo obligatorio']}
  });
	return loginSchema
}







    
	
