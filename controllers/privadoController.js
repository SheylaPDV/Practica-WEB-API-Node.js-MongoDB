'use strict';
const { Usuario } = require('../modelos');
class PrivadoController {
  async index(req, res, next) {
    try {
      const usuarioId = req.session.usuarioLogado._id;
      const usuario = await Usuario.findById(usuarioId);

      if (!usuario) {
        next(new Error('usuario no encontrado'));
        return;
      }
      res.render('privado', { email: usuario.email });
    } catch (error) {
      next(error);
      return;
    }
  }
}

module.exports = PrivadoController;
