var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GrupoSchema   = new Schema({
    nombre: String,
},
{
  timestamps: true
});

module.exports = mongoose.model('Grupo', GrupoSchema);