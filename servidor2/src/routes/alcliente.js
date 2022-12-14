const express = require("express");

const router = express.Router();

const pool = require("../database");

router.get("/noticias", async (req, res) => {
    
    const noticias = await pool.query("select url_foto, titulo, descripcion, enlace from noticia");
    res.send(noticias);

});

router.get("/mascotas", async (req, res) => {
    const mascotas = await pool.query("select nombre, edad, sexo, descripcion, url_foto, ciudad, raza from mascota");
    res.send(mascotas);
});

module.exports = router;