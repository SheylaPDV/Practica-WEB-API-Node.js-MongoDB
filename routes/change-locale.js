const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  //recoger paRAMETRO DEL COLCALE AL QUE HGAY QUE CAMBIAR
  const locale = req.params.locale;

  // PONER UNA COOKIE EN LA RESPUESTA QUE INDIQUE EL NUEVO LOCALE

  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 mes
  });
  // HACER UNA REDIRRECCION A LA PAGINA DESDE LA QUE VENIA

  res.redirect(req.get('Referer'));
});

module.exports = router;
