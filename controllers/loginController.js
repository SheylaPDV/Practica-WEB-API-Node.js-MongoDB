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
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.email = email;
        res.locals.error = res.__('invalid credentials');
        res.render('login');

        return;
      }

      // me apunto en la sesion de este usuarioque es un usuario logado
      req.session.usuarioLogado = {
        _id: usuario._id,
      };

      // si lo encuentro y la contraseña coincide, --> redirigir a la zona privada
      res.redirect('/privado');
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }
}

module.exports = LoginController;
