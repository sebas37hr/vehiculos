
// se genera la conexion a la Base de datos y las validaciones en caso de perder conexion. 
// en este archivo, traemos la bariable contante de las propiedades de la BD que se ecnuetra en 
// config/properties.js

const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => console.log(`Mongo connected on ${dbURL}`))
    .catch(err => console.log(`Connection has error ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`Mongo is disconnected`);
      process.exit(0)
    });
  });
}