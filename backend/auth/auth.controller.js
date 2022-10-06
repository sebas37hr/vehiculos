const User = require('./auth.dao');
const vehi =require('./vehi.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


//crear usuario
exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

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
    // response 
    res.send({ dataUser });
  });
}

//create Vehiculos BD
exports.createVehiculo = (veh, res, next) => {
const newVehiculo = {
capacidad: veh.body.capacidad,
cilindraje: veh.body.cilindraje,
soat: veh.body.soat,
placa: veh.body.placa,
propietario: veh.body.propietario,
}
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
  //response 
  res.send({dataVehi});

});
}

//mostrar Vehiculos 
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
      return properties;
    });
  
      console.log('data', propiedadesCarro);
     res.send({propiedadesCarro});
  });
}
  
  
  

//login
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











