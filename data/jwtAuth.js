"use strict";

const jwt = require("jsonwebtoken");

// modulo que exporta un middleware

module.exports = (req, res, next) => {
  // recogerr el jwtToken de la cabecera, o de la query-string , o del body

  const jwtToken =
    req.get("Authorization") || req.query.token || req.body.token;

  // comprobar que viene campo lleno
  if (!jwtToken) {
    const error = new Error("No token provider");
    error.status = 401;
    next(error);
    return;
  }

  // comprobar que el token es valido

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const error = new Error("invalid token");
      error.status = 401;
      next(error);
      return;
    }

    req.apiUserId = payload._id;

    next();
  });

  // si es valido, continuar
};
