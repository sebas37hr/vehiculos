// controller de la App, se encuentran los metodos proncipales para interactuar con la app
// registros, acceso, y consultas a la BD. 


const User = require('./auth.dao');
const vehi =require('./vehi.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


//crear usuario
// Se crea el arreglo que recibe los datos enviados desde el servicio. 
// seguardan en la variable newUser{};
exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }
// usamos el schema o modelo user mas la propiedad de mongo create, para adicionar a la BD los datos 
// que están en el arreglo newUser
//se realizan las verificaciones, en caso de que exista un dato en la BD o se haya perdido conexion a la BD.
  User.create(newUser, (err, user) => {
    console.log('xxxxxx',err);
    if (err && err.code === 11000) return res.status(409).send('Email already exists');
    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response, contiene los datos guardados en la BD  en un arreglo. 
    res.send({ dataUser });
  });
}

//create Vehiculos BD
// se crea el metodo y el arreglo que guarda los datos obtenidos del front en la variable newVehiculo. 
exports.createVehiculo = (veh, res, next) => {
const newVehiculo = {
capacidad: veh.body.capacidad,
cilindraje: veh.body.cilindraje,
soat: veh.body.soat,
placa: veh.body.placa,
propietario: veh.body.propietario,
}
// se llama al modelo mas la propiedad de mongo para crear datos en db.
// se realizan las respectivas validaciones de existencia de datos en la DB o perdida de conexion con la DB.
vehi.create(newVehiculo,(err, vehiculo)=>{
  console.log('zzzzz',err);
  if (err && err.code === 11000) return res.status(409).send('Ya existe el vehiculo');
  if (err) return res.status(500).send('Server error');

  const dataVehi = {
    capacidad: vehiculo.capacidad,
    cilindraje: vehiculo.cilindraje,
    soat: vehiculo.soat,
    placa: vehiculo.placa,
    propietario: vehiculo.propietario
  }
  //response , contiene los datos guardados en la DB. 
  res.send({dataVehi});

});
}

//mostrar Vehiculos
// Se realiza consulta a la BD, para mostrar los datos registrados.
// se usa el modelo mas la propiedad Find, sin nunguna condicion para que la Query traiga toda la info
// de la  coleccion vehiculos y la guarde en la variable datos.
// se crea la constante propiedadesCarro, la cual con la funcion map, hace un recorrido en cada 
// objeto del arreglo y se guardan en la variable Properties como un arreglo individual. 

exports.getVehi = (req, res)=>{
  vehi.find({}, (err, datos)=>{
    const propiedadesCarro = datos.map(dataVehi =>{
      const properties = {
      capacidad: dataVehi.capacidad,
      cilindraje: dataVehi.cilindraje,
      soat: dataVehi.soat,
      placa: dataVehi.placa,
      datos: dataVehi.propietario
      }

      // retornamos el arreglo properties, con las propiedades descritas anteriormente.
      return properties;
    });
  // en el console.log, podemos ver la data optenida, la cual sale en formato Json
      console.log('data', propiedadesCarro);
     res.send({propiedadesCarro});
  });
}
  
  
  

//login, en el metodo recibimos desl front, los datos de username y password, los cuales se guardan
// en el objeto userData y se realiza el Query en la base de datos con el modelo y la propiedad findOne.

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // email does not exist
      res.status(409).send({ message: 'Something is wrong' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
          // si se obtenene valores, se devuelve de la BD el siguente objeto dataUser;
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataUser });
      } else {
        // password wrong
        res.status(409).send({ message: 'Something is wrong' });
      }
    }
  });
}











