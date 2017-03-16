var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DepositoSchema   = new Schema({
	monto: Number,
    fecha: Date,
    _alumno : { type: String, ref: 'Alumno' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Deposito', DepositoSchema);