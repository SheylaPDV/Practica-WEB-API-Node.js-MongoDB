"use strict";

const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en", "es"],
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  autoReload: true, //(si cambia un fichero de idioma, lo vuelve a recargar, sin tener que tirar el programa)
  syncFiles: true, //ej. si va a añadir automaticamente una clave a uno de los ficheros de idiomas, lo mete en los demas idiomas
  cookie: "nodepop-locale",
});
//para utilizar en scripts
i18n.setLocale("en");

module.exports = i18n;
