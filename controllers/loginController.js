'use strict';
const { Usuario } = require('../modelos');

class LoginController {
  index(req, res, next) {
    res.locals.email = '';
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      //buscar usuario en la base de datos
      const usuario = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || usuario.password !== password) {
        res.locals.email = email;
        res.locals.error = res.__('invalid credentials');
        res.render('login');

        return;
      }

      // si lo encuentro y la contraseña coincide, --> redirigir a la zona privada
      res.redirect('/privado');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
