// generamos las rutas de la aplicacion, donde redireccionamos a la controladora y los metodos. 


const Users = require('./auth.controller');
const vehiculo = require('./auth.controller')

module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.post('/registerVehi', vehiculo.createVehiculo);
  router.get('/getVehiculo', vehiculo.getVehi);

}