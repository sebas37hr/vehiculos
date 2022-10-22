//Data access object
// se importa los models de la base de datos para crear el Data acceso Object 
// se generan las colecciones en la BD ( coleccion vehiculo)
// se realizan funciones y consultas ala BD. 

const mongoose = require('mongoose');
const vehiculoSchema = require('./vehi.model');

vehiculoSchema.statics = {
    create: function(data, cb){
    const vehiculo = new this(data);
    vehiculo.save(cb);
    }
   }

    const ModelVehi = mongoose.model('vehiculo', vehiculoSchema);
    module.exports = ModelVehi;