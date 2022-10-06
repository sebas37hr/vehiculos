const Users = require('./auth.controller');
const vehiculo = require('./auth.controller')

module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.post('/registerVehi', vehiculo.createVehiculo);
  router.get('/getVehiculo', vehiculo.getVehi);

}