//Data access object
// se importa los models de la base de datos para crear el Data acceso Object 
// se generan las colecciones en la BD ( coleccion Users)
// se realizan funciones y consultas ala BD. 

const mongoose = require('mongoose');
const authSchema = require('./auth.model');


authSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  },

}

const authModel = mongoose.model('Users', authSchema);

module.exports = authModel;
