var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarreraSchema   = new Schema({
    nombre: String,
    abreviacion: String,
    _alumnos : [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Carrera', CarreraSchema);