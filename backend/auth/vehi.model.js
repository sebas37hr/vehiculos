const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

//modelo BD Vehiculo 
const vehiSchema = new Schema({
    capacidad: {
      type: Number,
      required: false,
      trim: true,
  
    },
    cilindraje: {
      type: Number,
      required: false,
      trim: true,
  
    },
    soat: {
      type: String,
      required: false,
      trim: true,
  
    },
    placa: {
      type: String,
      required: false,
      trim: true,
  
    },
    propietario: {
      type: String,
      required: false,
      trim: true,
  
    },
  },
   
  );

  module.exports = vehiSchema;