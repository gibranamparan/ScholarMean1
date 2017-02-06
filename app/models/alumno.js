var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlumnoSchema   = new Schema({
	Nombre : String,
	ApellidoP : String,
	ApellidoM : String,
	FechaNac : Date,
	_carrera : { type: String, ref: 'Carrera' },
},
{
  timestamps: true
});

module.exports = mongoose.model('Alumno', AlumnoSchema);