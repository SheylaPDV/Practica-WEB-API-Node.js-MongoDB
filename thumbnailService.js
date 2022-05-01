"use strict";

const { Responder } = require("cote");

const nodemailer = require("nodemailer");
const jimp = require("jimp");
const { create } = require("jimp");
const responder = new Responder({ name: "servicio de thumbnails" });

async function main() {
  responder.on("convertir-imagen", async (req, done) => {
    const { file, destination, filename } = req;
    const ruta = __dirname + "/images" + file;
    const image = await jimp.read(ruta);

    image.resize(100, jimp.AUTO);
    const file_miniatura =
      __dirname + "/" + destination + "thumbnail_" + filename;
    await image.writeAsync(file_miniatura);

    done();
  });
}

main();
