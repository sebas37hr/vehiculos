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