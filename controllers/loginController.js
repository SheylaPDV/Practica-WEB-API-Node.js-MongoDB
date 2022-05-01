"use strict";
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

class LoginController {
  index(req, res, next) {
    res.locals.email = "";
    res.locals.error = "";
    res.render("login");
  }

  //CERRAR SESION, SI CIERRO ME ENVIA AL INICIO

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }

  // LOGIN POST DESDE API QUE RETORNA JWT

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      //BUSCAMOS USUARIO EN LA BASE DE DATOS
      const usuario = await Usuario.findOne({ email });

      // SI NO EXISTE EL USUARIO EN LA BD, MANTGENEMOS EMAIL EN INPUT, DAMOS MENSAJE (USER NOT FOUND), Y RENDERIZAMOS LA MISMA PAGINA DE LOGIN
      if (!usuario) {
        const error = new Error();
        error.message = res.__("User not found");
        error.status = 401;
        next(error);

        return;
      }

      // SI NO EXISTE EL USUARIO O NO COINCIDE LA CONTRASEÑA, MANTENEMOS EMAIL EN EL INPUT, MANDAMOS MENSAJE(CREDENCIALES INVALIDAS) Y RENDERIZAMOS LA MISMA PAGINA DE LOGIN
      if (!usuario || !(await usuario.comparePassword(password))) {
        const error = new Error();
        error.message = res.__("Invalid credentials");
        error.status = 401;
        next(error);

        return;
      }

      //SI COINCIDE USUARIO Y CONTRASEÑA EN LA BD, GENERAMOS UN JWT CON SU _ID
      jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // DEVOLVER EL TOKEN AL CLIENTE EN FORMATO JSON
          res.json({ token: jwtToken });
        }
      );

      // REDIRIGIMOS A API ANUNCIOS SI TIENE TOKEN
      // res.redirect("/api/anuncios");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;

//login post from website

// async post(req, res, next) {
//   try {
//     // RECOGO EMAIL Y PASSWORD DEL BODY CON DESTRUCTURING
//     const { email, password } = req.body;

//     //BUSCO USUARIO EN LA BD
//     const usuario = await Usuario.findOne({ email });

//     // SI NO EXISTE EL USUARIO EN LA BD, MANTGENEMOS EMAIL EN INPUT, DAMOS MENSAJE (USER NOT FOUND), Y RENDERIZAMOS LA MISMA PAGINA DE LOGIN
//     if (!usuario) {
//       res.locals.email = email;
//       res.locals.error = res.__("User not found");
//       res.render("login");
//       return;
//     }

//     // SI NO EXISTE EL USUARIO O NO COINCIDE LA CONTRASEÑA, MANTENEMOS EMAIL EN EL INPUT, MANDAMOS MENSAJE(CREDENCIALES INVALIDAS) Y RENDERIZAMOS LA MISMA PAGINA DE LOGIN

//     if (!usuario || !(await usuario.comparePassword(password))) {
//       res.locals.email = email;
//       res.locals.error = res.__("invalid credentials");
//       res.render("login");
//       return;
//     }

//     // ME APUNTO EN LA SESION DE ESTE USUARIO QUE ES UN USUARIO LOGADO
//     req.session.usuarioLogado = {
//       _id: usuario._id,
//     };
//     // ---------------------------------------------------------------------------------------------------------
//     // ENVIAR EMAILS

//     // ENVIAR UN EMAIL AL USUARIO
//     //  usuario.enviarEmail(
//     //     'Bienvenido',
//     //     'Bienvenido a NodeApp',
//     //   );

//     // const resultado = usuario
//     //   .enviarEmailConMicroservicio("Bienvenido", "Bienvenido a NodeApp")
//     //   .catch((err) => {
//     //     console.log("Hubo un error al enviar el email", err);
//     //   });
//     // -----------------------------------------------------------------------------------------------------
