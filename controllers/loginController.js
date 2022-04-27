'use strict';
const jwt = require('jsonwebtoken')
const { Usuario } = require('../modelos');

class LoginController {
  index(req, res, next) {
    res.locals.email = '';
    res.locals.error = '';
    res.render('login');
  }

  //login post from website

  async post(req, res, next) {
    try {
      // envio email y password en el body
      const { email, password } = req.body;

      //buscar usuario en la base de datos
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        res.locals.email = email;
        res.locals.error = res.__('User not found');
        res.render('login');
        return;
      }

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

      // enviar un email al usuario
      // const result = await usuario.enviarEmail(
      //   'Bienvenido',
      //   'Bienvenido a NodeApp',
      // );
      // console.log(result);

      // si lo encuentro y la contraseña coincide, --> redirigir a la zona privada
      res.redirect('/privado');
    } catch (error) {
      next(error);
    }
  }

  //Logout, si cierro me envia a inciio

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }

  // login post desde API que retorna JWT

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      //buscar usuario en la base de datos
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        res.locals.email = email;
        res.locals.error = res.__('User not found');
        res.render('login');
        return;
      }

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.email = email;
        res.locals.error = res.__('invalid credentials');
        res.render('login');
        return;
      }

      // generamos un JWT con su _id
      let jwtToken = jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );
      
      //req.body.token = jwtToken;
      // const token = data.accessToken;
      // req.query.localStorage.setItem('jwt', token);
      req.query.token = jwtToken;
      
      console.log('tokeeen',token )
      res.redirect('/api/anuncios');

    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
